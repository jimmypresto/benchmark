# To run the benchmark on preset json samples
$ node benchmark_json_parsing.js
JSON#parse 1.json, 578KB, 5470 fields, monomorphic x 764 ops/sec ±0.90% (89 runs sampled)
JSON#parse 2.json, 932KB, 8800 fields, monomorphic x 469 ops/sec ±0.63% (89 runs sampled)
JSON#parse 3.json, 1297KB, 12190 fields, monomorphic x 335 ops/sec ±0.85% (88 runs sampled)
JSON#parse rotated blobs of same size like 1.json x 747 ops/sec ±1.37% (90 runs sampled)
Fastest is JSON#parse 1.json, 578KB, 5470 fields, monomorphic

# To generate a sythentic json file; with monomorphic data type (string)
$ node -p "var m = require('./create_json'); m.create_default_json();"
