# BmiCalculator SDK

Compute Body Mass Index from weight and height and get the matching health category

> TypeScript, Python, PHP, Golang, Ruby, Lua SDKs, a CLI, an interactive REPL, and an MCP server for AI agents — all generated from one OpenAPI spec by [@voxgig/sdkgen](https://github.com/voxgig/sdkgen).

## About BMI Calculator API

The BMI Calculator API is a small public endpoint hosted on [Vercel](https://bmicalculatorapi.vercel.app) that turns a weight and height pair into a Body Mass Index value and a corresponding health classification. It is catalogued on [Free Public APIs](https://freepublicapis.com/bmi-calculator-api).

What you get from the API:

- A single `GET` operation at `/api/bmi/{weight}/{height}` that accepts weight in kilograms and height in metres.
- A JSON response containing the input `Weight` and `Height`, the calculated `BMI` value, and a `Category` string such as `Healthy` or `Overweight`.

The service is publicly accessible with no authentication. CORS is not enabled, so requests typically need to be made from a server-side environment rather than directly from a browser.

## Try it

**TypeScript**
```bash
npm install bmi-calculator
```

**Python**
```bash
pip install bmi-calculator-sdk
```

**PHP**
```bash
composer require voxgig/bmi-calculator-sdk
```

**Golang**
```bash
go get github.com/voxgig-sdk/bmi-calculator-sdk/go
```

**Ruby**
```bash
gem install bmi-calculator-sdk
```

**Lua**
```bash
luarocks install bmi-calculator-sdk
```

## 30-second quickstart

### TypeScript

```ts
import { BmiCalculatorSDK } from 'bmi-calculator'

const client = new BmiCalculatorSDK({})

```

See the [TypeScript README](ts/README.md) for the
full guide, or scroll down for the same example in other languages.

## What's in the box

| Surface | Use it for | Path |
| --- | --- | --- |
| **SDK** (TypeScript, Python, PHP, Golang, Ruby, Lua) | App integration | `ts/` `py/` `php/` `go/` `rb/` `lua/` |
| **CLI** | Scripts, CI, ops, one-off API calls | `go-cli/` |
| **MCP server** | AI agents (Claude, Cursor, Cline) | `go-mcp/` |

## Use it from an AI agent (MCP)

The generated MCP server exposes every operation in this SDK as an
[MCP](https://modelcontextprotocol.io) tool that Claude, Cursor or Cline
can call directly. Build and register it:

```bash
cd go-mcp && go build -o bmi-calculator-mcp .
```

Then add it to your agent's MCP config (Claude Desktop, Cursor, etc.):

```json
{
  "mcpServers": {
    "bmi-calculator": {
      "command": "/abs/path/to/bmi-calculator-mcp"
    }
  }
}
```

## Entities

The API exposes one entity:

| Entity | Description | API path |
| --- | --- | --- |
| **Bmi** | Body Mass Index calculations derived from a weight and height pair, served from `GET /api/bmi/{weight}/{height}` and returning the BMI value with its health category. | `/api/bmi/{weight}/{height}` |

Each entity supports the following operations where available: **load**,
**list**, **create**, **update**, and **remove**.

## Quickstart in other languages

### Python

```python
from bmicalculator_sdk import BmiCalculatorSDK

client = BmiCalculatorSDK({})


# Load a specific bmi
bmi, err = client.Bmi(None).load(
    {"id": "example_id"}, None
)
```

### PHP

```php
<?php
require_once 'bmicalculator_sdk.php';

$client = new BmiCalculatorSDK([]);


// Load a specific bmi
[$bmi, $err] = $client->Bmi(null)->load(
    ["id" => "example_id"], null
);
```

### Golang

```go
import sdk "github.com/voxgig-sdk/bmi-calculator-sdk/go"

client := sdk.NewBmiCalculatorSDK(map[string]any{})

```

### Ruby

```ruby
require_relative "BmiCalculator_sdk"

client = BmiCalculatorSDK.new({})


# Load a specific bmi
bmi, err = client.Bmi(nil).load(
  { "id" => "example_id" }, nil
)
```

### Lua

```lua
local sdk = require("bmi-calculator_sdk")

local client = sdk.new({})


-- Load a specific bmi
local bmi, err = client:Bmi(nil):load(
  { id = "example_id" }, nil
)
```

## Unit testing in offline mode

Every SDK ships a test mode that swaps the HTTP transport for an
in-memory mock, so unit tests run offline.

### TypeScript

```ts
const client = BmiCalculatorSDK.test()
const result = await client.Bmi().load({ id: 'test01' })
// result.ok === true, result.data contains mock data
```

### Python

```python
client = BmiCalculatorSDK.test(None, None)
result, err = client.Bmi(None).load(
    {"id": "test01"}, None
)
```

### PHP

```php
$client = BmiCalculatorSDK::test(null, null);
[$result, $err] = $client->Bmi(null)->load(
    ["id" => "test01"], null
);
```

### Golang

```go
client := sdk.TestSDK(nil, nil)
result, err := client.Bmi(nil).Load(
    map[string]any{"id": "test01"}, nil,
)
```

### Ruby

```ruby
client = BmiCalculatorSDK.test(nil, nil)
result, err = client.Bmi(nil).load(
  { "id" => "test01" }, nil
)
```

### Lua

```lua
local client = sdk.test(nil, nil)
local result, err = client:Bmi(nil):load(
  { id = "test01" }, nil
)
```

## How it works

Every SDK call runs the same five-stage pipeline:

1. **Point** — resolve the API endpoint from the operation definition.
2. **Spec** — build the HTTP specification (URL, method, headers, body).
3. **Request** — send the HTTP request.
4. **Response** — receive and parse the response.
5. **Result** — extract the result data for the caller.

A feature hook fires at each stage (e.g. `PrePoint`, `PreSpec`,
`PreRequest`), so features can inspect or modify the pipeline without
forking the SDK.

### Features

| Feature | Purpose |
| --- | --- |
| **TestFeature** | In-memory mock transport for testing without a live server |

Pass custom features via the `extend` option at construction time.

### Direct and Prepare

For endpoints the entity model doesn't cover, use the low-level methods:

- **`direct(fetchargs)`** — build and send an HTTP request in one step.
- **`prepare(fetchargs)`** — build the request without sending it.

Both accept a map with `path`, `method`, `params`, `query`,
`headers`, and `body`. See the [How-to guides](#how-to-guides) below.

## How-to guides

### Make a direct API call

When the entity interface does not cover an endpoint, use `direct`:

**TypeScript:**
```ts
const result = await client.direct({
  path: '/api/resource/{id}',
  method: 'GET',
  params: { id: 'example' },
})
console.log(result.data)
```

**Python:**
```python
result, err = client.direct({
    "path": "/api/resource/{id}",
    "method": "GET",
    "params": {"id": "example"},
})
```

**PHP:**
```php
[$result, $err] = $client->direct([
    "path" => "/api/resource/{id}",
    "method" => "GET",
    "params" => ["id" => "example"],
]);
```

**Go:**
```go
result, err := client.Direct(map[string]any{
    "path":   "/api/resource/{id}",
    "method": "GET",
    "params": map[string]any{"id": "example"},
})
```

**Ruby:**
```ruby
result, err = client.direct({
  "path" => "/api/resource/{id}",
  "method" => "GET",
  "params" => { "id" => "example" },
})
```

**Lua:**
```lua
local result, err = client:direct({
  path = "/api/resource/{id}",
  method = "GET",
  params = { id = "example" },
})
```

## Per-language documentation

- [TypeScript](ts/README.md)
- [Python](py/README.md)
- [PHP](php/README.md)
- [Golang](go/README.md)
- [Ruby](rb/README.md)
- [Lua](lua/README.md)

## Using the BMI Calculator API

- Upstream: [https://bmicalculatorapi.vercel.app](https://bmicalculatorapi.vercel.app)
- API docs: [https://freepublicapis.com/bmi-calculator-api](https://freepublicapis.com/bmi-calculator-api)

---

Generated from the BMI Calculator API OpenAPI spec by [@voxgig/sdkgen](https://github.com/voxgig/sdkgen).
