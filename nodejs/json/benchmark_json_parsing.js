var fs = require('fs');
var Benchmark = require('benchmark');
var suite = new Benchmark.Suite;
var create_json = require('./create_json');

var json_samples_of_same_size = []; 
var data1 = '';
var data2 = '';
var data3 = '';
var sample_count_for_rotation = 30;
for(var i = 0; i < sample_count_for_rotation; i++) {
    var blob = JSON.stringify(create_json.create_default_json());
    json_samples_of_same_size.push(blob);
}
var count = 0;

fs.readFile('1.json', 'utf-8', (_err, data) => {
    data1 = data;
});
fs.readFile('2.json', 'utf-8', (_err, data) => {
    data2 = data;
});
fs.readFile('3.json', 'utf-8', (_err, data) => {
    data3 = data;
});

suite.add('JSON#parse 1.json', function() {
    var json = JSON.parse(data1);
})
.add('JSON#parse 2.json', function() {
    var json = JSON.parse(data2);
})
.add('JSON#parse 3.json', function() {
    var json = JSON.parse(data3);
})
.add('JSON#parse rotated blobs of same size like 1.json', function() {
    var blob = json_samples_of_same_size[count++ % sample_count_for_rotation];
    var json = JSON.parse(blob);
})
.on('cycle', function(event) {
    console.log(String(event.target));
})
.on('complete', function() {
    console.log('Fastest is ' + this.filter('fastest').map('name'));
})
.run({ 'async': true });