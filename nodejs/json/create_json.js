
const response_kb_sizes = [ 336, 541, 750, 1024, 2048 ];
const json_field_byte_sizes = 63;
const total_field_counts = response_kb_sizes.map((kb) => Math.round((kb * 1024) / json_field_byte_sizes));
const fields_at_each_level = 10;

function create_random_value(length) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
   }
   return result;
}

function create_json(queue, remain_field_counts, fields_at_each_level, current_level) {
    var toplevel = queue[0];
    var json = toplevel;
    queue.shift();

    do {
        for(i = 0; i < fields_at_each_level; i++) {
            key = 'value_' + i + '_level_' + current_level;
            value = create_random_value(json_field_byte_sizes);
            json[key] = value;
        }
        remain_field_counts -= fields_at_each_level;

        current_level++;
        for(i = 0; i < fields_at_each_level && remain_field_counts > i * fields_at_each_level; i++) {
            const child_key = 'child_' + i + '_level_' + current_level;
            json[child_key] = {}
            queue.push(json[child_key]);
        }

        json = queue[0];
        queue.shift();
    } while(json && remain_field_counts > 0);

    return toplevel;

}

//json = create_json([{}], total_field_counts[0], fields_at_each_level, 0);
//console.log(JSON.stringify(json));

function create_default_json() {
    return create_json([{}], total_field_counts[0], fields_at_each_level, 0);
}

module.exports = { create_default_json };