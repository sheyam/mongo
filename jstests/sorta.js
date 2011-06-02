// SERVER-2905 sorting with missing fields

t = db.jstests_sorta;
t.drop();

t.save( {_id:0,a:MinKey} );
t.save( {_id:1,a:null} );
t.save( {_id:2,a:[]} );
t.save( {_id:7,a:[2]} );
t.save( {_id:3} );
t.save( {_id:4,a:null} );
t.save( {_id:5,a:[]} );
t.save( {_id:6,a:1} );
t.save( {_id:8,a:MaxKey} );

function sorted( arr ) {
 	for( i = 1; i < arr.length; ++i ) {
     	assert.lte( arr[ i-1 ]._id, arr[ i ]._id );
    }
}

sorted( t.find().sort( {a:1} ).toArray() );
t.ensureIndex( {a:1} );
sorted( t.find().sort( {a:1} ).hint( {a:1} ).toArray() );
