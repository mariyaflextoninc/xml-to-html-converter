/**
 * @author Mariya Tomy
 * Contains the common properties and method to get back the html content of each element
 */

var ElementFactory = {};

ElementProperty={
	Constants : {
		LABELNAME   : "label",
		CHECKBOX    : "checkbox",
		RADIOBUTTON : "radio",
		TEXTBOX     : "text",
	}
}
/**
 * Generates html content by checking the type
 * @param elementObj
 * @returns html content.
 */ 
ElementFactory.getElement = function (elementObj) {
		var type = elementObj.getType();
		switch(type){
			case ElementProperty.Constants.LABELNAME:
				 obj = new Label.Utility();
				 break;
			case ElementProperty.Constants.CHECKBOX:
				 obj = new CheckBox.Utility();
				 break;
			case ElementProperty.Constants.RADIOBUTTON:
				 obj = new RadioButton.Utility();
				 break;
			case ElementProperty.Constants.TEXTBOX:
				 obj = new TextBox.Utility();
				 break;
		}
		var resultantHtml = obj.getHtmlString(elementObj);
		return resultantHtml;
}