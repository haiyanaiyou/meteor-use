Template.aggregate.onCreated(()=>{
	var template=Template.instance();
	template.currentType=new ReactiveVar('all');
	template.currentName=new ReactiveVar('all');
	template.total=new ReactiveVar();

});
Template.aggregate.onRendered(function(){
	var template=Template.instance();
	template.autorun(function(){
		fetchData(template);
	});
});                                   
Template.aggregate.helpers({
	investType:function(){
		var all=Investments.find();
		return _.uniq(all.map((item) => {
			return item.type;
		}),true);
	},
	currentType:function(){
		return Template.instance().currentType.get();

	},
	investName:function(currentType){
		var cdt={};
		if(currentType !="all"){
			cdt={
				type:currentType
			}

		}
		var ret =Investments.find(cdt);
		return ret.map((item)=>{
			return item.name;

		});

	},
	incomeItems:function(){
		var items=Template.instance().total.get();
		if(items){
			return items.map((item,index)=>{
				var name=item._id.name;
				return {
					_id:index,
					item:{
						type:item._id.type,
						name:name ? name:"all"

					},
					total:item.total
				};

			});

		}

	}
});
Template.aggregate.events({
	'change [name="invest_type"]':function(evt,tpl){
		var currentType=evt.target.value;
		Template.instance().currentType.set(currentType);

	},
	'change [name="invest_name"]':function(evt,tpl){
		var currentName=evt.target.value;
		Template.instance().currentName.set(currentName);

	}
});
function fetchData(template){
	var filter={
		type:template.currentType.get(),
		name:template.currentName.get()
	};
	Meteor.call('getData',filter,function(error,response){
	template.total.set(response);

});

}
