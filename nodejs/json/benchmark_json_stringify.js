var fs = require('fs');
var Benchmark = require('benchmark');
var suite = new Benchmark.Suite;
var create_json = require('./create_json');

var json_samples_of_same_size = []; 
var json1;
var json2;
var json3;
var sample_count_for_rotation = 30;
for(var i = 0; i < sample_count_for_rotation; i++) {
    json_samples_of_same_size.push(create_json.create_default_json());
}
var count = 0;

fs.readFile('1.json', 'utf-8', (_err, data) => {
    json1 = JSON.parse(data);
});
fs.readFile('2.json', 'utf-8', (_err, data) => {
    json2 = JSON.parse(data);
});
fs.readFile('3.json', 'utf-8', (_err, data) => {
    json3 = JSON.parse(data);
});

suite.add('JSON#stringify 1.json, 578KB, 5470 fields, monomorphic', function() {
    var json_str = JSON.stringify(json1);
})
.add('JSON#stringify 2.json, 932KB, 8800 fields, monomorphic', function() {
    var json_str = JSON.stringify(json2);
})
.add('JSON#stringify 3.json, 1297KB, 12190 fields, monomorphic', function() {
    var json_str = JSON.stringify(json3);
})
.add('JSON#stringify rotated json objects like 1.json', function() {
    var json_obj = json_samples_of_same_size[count++ % sample_count_for_rotation];
    var json_str = JSON.stringify(json_obj);
})
.on('cycle', function(event) {
    console.log(String(event.target));
})
.on('complete', function() {
    console.log('Fastest is ' + this.filter('fastest').map('name'));
})
.run({ 'async': true });
