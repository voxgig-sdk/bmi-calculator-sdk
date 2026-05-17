package sdktest

import (
	"encoding/json"
	"os"
	"path/filepath"
	"runtime"
	"strings"
	"testing"
	"time"

	sdk "github.com/voxgig-sdk/bmi-calculator-sdk/go"
	"github.com/voxgig-sdk/bmi-calculator-sdk/go/core"

	vs "github.com/voxgig-sdk/bmi-calculator-sdk/go/utility/struct"
)

func TestBmiEntity(t *testing.T) {
	t.Run("instance", func(t *testing.T) {
		testsdk := sdk.TestSDK(nil, nil)
		ent := testsdk.Bmi(nil)
		if ent == nil {
			t.Fatal("expected non-nil BmiEntity")
		}
	})

	t.Run("basic", func(t *testing.T) {
		setup := bmiBasicSetup(nil)
		// Per-op sdk-test-control.json skip — basic test exercises a flow
		// with multiple ops; skipping any op skips the whole flow.
		_mode := "unit"
		if setup.live {
			_mode = "live"
		}
		for _, _op := range []string{"load"} {
			if _shouldSkip, _reason := isControlSkipped("entityOp", "bmi." + _op, _mode); _shouldSkip {
				if _reason == "" {
					_reason = "skipped via sdk-test-control.json"
				}
				t.Skip(_reason)
				return
			}
		}
		// The basic flow consumes synthetic IDs from the fixture. In live mode
		// without an *_ENTID env override, those IDs hit the live API and 4xx.
		if setup.syntheticOnly {
			t.Skip("live entity test uses synthetic IDs from fixture — set BMICALCULATOR_TEST_BMI_ENTID JSON to run live")
			return
		}
		client := setup.client

		// Bootstrap entity data from existing test data (no create step in flow).
		bmiRef01DataRaw := vs.Items(core.ToMapAny(vs.GetPath("existing.bmi", setup.data)))
		var bmiRef01Data map[string]any
		if len(bmiRef01DataRaw) > 0 {
			bmiRef01Data = core.ToMapAny(bmiRef01DataRaw[0][1])
		}
		// Discard guards against Go's unused-var check when the flow's steps
		// happen not to consume the bootstrap data (e.g. list-only flows).
		_ = bmiRef01Data

		// LOAD
		bmiRef01Ent := client.Bmi(nil)
		bmiRef01MatchDt0 := map[string]any{}
		bmiRef01DataDt0Loaded, err := bmiRef01Ent.Load(bmiRef01MatchDt0, nil)
		if err != nil {
			t.Fatalf("load failed: %v", err)
		}
		if bmiRef01DataDt0Loaded == nil {
			t.Fatal("expected load result to be non-nil")
		}

	})
}

func bmiBasicSetup(extra map[string]any) *entityTestSetup {
	loadEnvLocal()

	_, filename, _, _ := runtime.Caller(0)
	dir := filepath.Dir(filename)

	entityDataFile := filepath.Join(dir, "..", "..", ".sdk", "test", "entity", "bmi", "BmiTestData.json")

	entityDataSource, err := os.ReadFile(entityDataFile)
	if err != nil {
		panic("failed to read bmi test data: " + err.Error())
	}

	var entityData map[string]any
	if err := json.Unmarshal(entityDataSource, &entityData); err != nil {
		panic("failed to parse bmi test data: " + err.Error())
	}

	options := map[string]any{}
	options["entity"] = entityData["existing"]

	client := sdk.TestSDK(options, extra)

	// Generate idmap via transform, matching TS pattern.
	idmap := vs.Transform(
		[]any{"bmi01", "bmi02", "bmi03", "weight01"},
		map[string]any{
			"`$PACK`": []any{"", map[string]any{
				"`$KEY`": "`$COPY`",
				"`$VAL`": []any{"`$FORMAT`", "upper", "`$COPY`"},
			}},
		},
	)

	// Detect ENTID env override before envOverride consumes it. When live
	// mode is on without a real override, the basic test runs against synthetic
	// IDs from the fixture and 4xx's. Surface this so the test can skip.
	entidEnvRaw := os.Getenv("BMICALCULATOR_TEST_BMI_ENTID")
	idmapOverridden := entidEnvRaw != "" && strings.HasPrefix(strings.TrimSpace(entidEnvRaw), "{")

	env := envOverride(map[string]any{
		"BMICALCULATOR_TEST_BMI_ENTID": idmap,
		"BMICALCULATOR_TEST_LIVE":      "FALSE",
		"BMICALCULATOR_TEST_EXPLAIN":   "FALSE",
		"BMICALCULATOR_APIKEY":         "NONE",
	})

	idmapResolved := core.ToMapAny(env["BMICALCULATOR_TEST_BMI_ENTID"])
	if idmapResolved == nil {
		idmapResolved = core.ToMapAny(idmap)
	}

	if env["BMICALCULATOR_TEST_LIVE"] == "TRUE" {
		mergedOpts := vs.Merge([]any{
			map[string]any{
				"apikey": env["BMICALCULATOR_APIKEY"],
			},
			extra,
		})
		client = sdk.NewBmiCalculatorSDK(core.ToMapAny(mergedOpts))
	}

	live := env["BMICALCULATOR_TEST_LIVE"] == "TRUE"
	return &entityTestSetup{
		client:        client,
		data:          entityData,
		idmap:         idmapResolved,
		env:           env,
		explain:       env["BMICALCULATOR_TEST_EXPLAIN"] == "TRUE",
		live:          live,
		syntheticOnly: live && !idmapOverridden,
		now:           time.Now().UnixMilli(),
	}
}
