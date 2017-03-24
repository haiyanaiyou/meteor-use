Investments=new Mongo.Collection("investment");
Meteor.methods({
	getData:function(filter){
		var group={
			_id:{
				type:"$type"

			},
			total:{
				$sum:"$income"
			}
		};
		if(filter.name!=="all"){
			group._id.name= "$name";

		}
		if(filter.type==="all"){
			delete filter.type;

		}
		if(filter.name==="all"){
			delete filter.name;

		}
		
		return Investments.aggregate({
			$match:filter
		},{
			$group:group
		});



	}
});