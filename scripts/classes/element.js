/**
 * @author Mariya Tomy
 * Contains all classess for each xml component which represents the html ui.
 */

var Label       = {};
var RadioButton = {};
var TextBox     = {};
var CheckBox    = {};
var Element     = {};
/******************Element Class*******************/
Element = {
	Utility: function(){
		var  id = "",classname  = "",style  = "",name  = "",value  = "",
		content  = "",type  = "",element  = "",isHead = "",isChecked = "";
		//Getters and Setters for each property
		return{
			getisHead : function(){
				return isHead;
			},
			getID : function(){
				return id;
			},
			getName : function(){
				return name;
			},
			getClass : function(){
				return classname;
			},
			getStyle : function(){
				return style;
			},
			getType : function(){
				return type;
			},
			getContent: function(){
				return content;
			},
			getIsChecked: function(){
				return isChecked;
			},
			getValue: function(){
				return value;
			},
			setisHead : function(ishead){
				isHead = ishead;
			},
			setID : function(eid){
				id = eid;
			},
			setName : function(ename){
				name = ename;
			},
			setClass : function(eclass){
				classname = eclass;
			},
			setStyle : function(estyle){
				style = estyle;
			},
			setType : function(etype){
				type = etype;
			},
			setContent: function(econtent){
				content = econtent;
			},
			setIsChecked: function(echecked){
				isChecked = echecked;
			},
			setValue: function(evalue){
				value = evalue;
			}
		}
	}
}
/****************Label Class*************/
Label = {
	Constants : {
	},
	Utility   : function() {
		/**
		 * Function create the label element in html form inside a td container
		 * @returns {String}
		 */
		function _getHtmlContent(elementObj){
			var attributes = "";
			var rowText    = "td>";
			if(elementObj.getID() != "" ){
				attributes +=' id="' + elementObj.getID() + '"';
			}
			if(elementObj.getName() != ""){
				attributes +=' name="' + elementObj.getName() + '"';
			}
			if(elementObj.getClass() != ""){
				attributes +=' class="' + elementObj.getClass() + '"';
			}
			if(elementObj.getStyle() != ""){
				attributes +=' style="' + elementObj.getStyle() + '"';
			}
			if(elementObj.getisHead() != ""){
				rowText = "th>";
			}
			//alert("attributes = "+attributes)
			var  htmlVal = '<' + rowText + '<label' + attributes + ' >'+elementObj.getContent()+'</label></'+rowText;
			//alert("value"+htmlVal);
			return htmlVal;
		}
		return {
			getHtmlString: function(elementObj) {
            	var val =  _getHtmlContent(elementObj);
            	return val;
			}
        }
	}
}
/****************Text Box*************/	
TextBox = {
		Constants : {
			
		},
		Utility   : function() {
			/**
			 * Function create the Text input element in html form inside a td container
			 * @returns {String}
			 */
			function _getHtmlContent(elementObj){
				var attributes="";
				if(elementObj.getID() != "" ){
					attributes +=' id="' + elementObj.getID() + '"';
				}
				if(elementObj.getName() != ""){
					attributes +=' name="' + elementObj.getName() + '"';
				}
				if(elementObj.getClass() != ""){
					attributes +=' class="' + elementObj.getClass() + '"';
				}
				if(elementObj.getStyle() != ""){
					attributes +=' style="' + elementObj.getStyle() + '"';
				}
				if(elementObj.getValue() != ""){
					attributes +=' value="' + elementObj.getValue() + '"';
				}
				//alert("attributes = "+attributes);
				return '<td><input type="text"' + attributes + ' /></td>';
			}
			return {
				getHtmlString: function(elementObj) {
	            	return _getHtmlContent(elementObj);
				}
	        }
		}
	}
/****************Radio Button*************/	
RadioButton = {
	Constants : {
		
	},
	Utility   : function() {
		/**
		 * Function create the RadioButton element in html form inside a td container
		 * @returns {String}
		 */
		function _getHtmlContent(elementObj) {
			var attributes="";
			if(elementObj.getID() != "" ){
				attributes +=' id="' + elementObj.getID() + '"';
			}
			if(elementObj.getName() != ""){
				attributes +=' name="' + elementObj.getName() + '"';
			}
			if(elementObj.getClass() != ""){
				attributes +=' class="' + elementObj.getClass() + '"';
			}
			if(elementObj.getStyle() != ""){
				attributes +=' style="' + elementObj.getStyle() + '"';
			}
			if(elementObj.getValue() != ""){
					attributes +=' value="' + elementObj.getValue() + '"';
			}
			if(elementObj.getIsChecked() != ""){
					if(elementObj.getIsChecked() == "true")
						attributes +=' checked';
			}
			//alert("attributes = "+attributes);
			return '<td><input type="radio"' + attributes + ' ></input></td>';
		}
		return {
			getHtmlString: function(elementObj) {
            	return _getHtmlContent(elementObj);
			}
        }
	}
}
/****************Check Box*************/	
CheckBox = {
	Constants : {
		
	},
	Utility   : function(elementObj) {
		/**
		 * Function create the checkbox element in html form inside a td container
		 * @returns {String}
		 */
		function _getHtmlContent(elementObj) {
			var attributes="";
			if(elementObj.getID() != "" ){
				attributes +=' id="' + elementObj.getID() + '"';
			}
			if(elementObj.getName() != ""){
				attributes +=' name="' + elementObj.getName() + '"';
			}
			if(elementObj.getClass() != ""){
				attributes +=' class="' + elementObj.getClass() + '"';
			}
			if(elementObj.getStyle() != ""){
				attributes +=' style="' + elementObj.getStyle() + '"';
			}
			if(elementObj.getValue()!= ""){
					attributes +=' value="' + elementObj.getValue() + '"';
			}
			if(elementObj.getIsChecked() != ""){
					if(elementObj.getIsChecked() == "true")
						attributes +=' checked';
			}
			//alert("attributes = "+attributes);
			return '<td><input type="checkbox" ' + attributes + ' /></td>';
		}
		return {
			getHtmlString: function(elementObj) {
            	return _getHtmlContent(elementObj);
			}
        }
	}
}