 /**
  * @author Mariya Tomy
  * Contains  class to parse XMl File .
  * Collect html content of each element  and 
  * combine it to form an html page.
  */ 
$(document).ready(function(){
	var parseXMLContent	= new ParseXMLContent.Utility(); //object creation
    parseXMLContent.initialize();
});
ParseXMLContent = {
	
	Constants : {
		VIEWSOURCEURL   : "https://17a6b92e7e66f43750e6a845d18f9dd64ec1d6ce.googledrive.com/host/0B1qFpJpXjuYzfjdwN3AzX1dDSDVLemFwcFhHMFF5QndfN3J1X1RuQnZYSUVfdkJhTk44d3M/view_source.html",
		ROWNAME         : "row",
		TABLEID         : "#tbl_xmltohtml tr"
		     
	},

	Utility : function() {
		
		/** variable declaration **/
		 var xml = "";
		 var xmlDoc  = "";
		 var htmlContainer = $('#html_container div');
		 var btnSave = $("#btn_save");
		 
		/**
		 * Binding button's click events
		 **/
		function _initializeXMLParser(){
			
			$("#btn_result").on("click",_parseXML);
			btnSave.on("click",_saveXML);
			$('#btnview_source').on("click",_openView);
		}
		
		/**
		* Open new window to view the source pages
		**/
		function _openView(){
			window.open(ParseXMLContent.Constants.VIEWSOURCEURL);
		}
		
		/**
		 * Parse XML using DOMParser
		 * @param xml
		 */
		function _parseXML(){
			if (window.DOMParser){
				parser = new DOMParser();
				xmlDoc = parser.parseFromString(xml,"text/xml");
			} 
			else {// Internet Explorer
			    xmlDoc = new ActiveXObject("Microsoft.XMLDOM");
			    xmlDoc.async = false;
			    xmlDoc.loadXML(text);
		   } 
			_createHTML(xmlDoc);// call function to create the html form of xml
		}
		
		/**
		 * Create HTML syntax for each element in XML
		 * @param xmlDoc
		 */
		function _createHTML(){
			var headerText = '<table id="tbl_xmltohtml">';
			var footerText = '</table>';
			var htmlText   = "";
			var mainChild  = xmlDoc.getElementsByTagName(ParseXMLContent.Constants.ROWNAME);
			var resultText = headerText + _loopXmlElements(htmlText,mainChild) + footerText;//function call
			htmlContainer.empty();
			htmlContainer.append(resultText);
			btnSave.css('display', 'block');
			//alert(resultText);
		}
		
		/**
		 * Function that loops through each node in an xml
		 * @param htmlText - append each html element to the text
		 * @param mainChild - all nodes of row.
		 * @returns html string - append html element and return the string
		 */
		function _loopXmlElements(htmlText,mainChild){
			
			var flag= 0;
			for(var rowIndx = 0; rowIndx < mainChild.length; rowIndx++){//row
				htmlText +='<tr>';
			    
			    var childNode = mainChild[rowIndx].childNodes;
			    for (var colindex = 0; colindex < childNode.length; colindex++) {//col
			    	var child = childNode[colindex].childNodes;
			    	flag = 0;
			    	
			    	for (var childIndx = 0; childIndx < child.length; childIndx++) {//element child
			    		htmlText += _getHtml(child,childIndx);
			   		}//end of each  element tag
			    }//end of col
			    htmlText += '</tr>';
			}//end of row
			return htmlText;
		}
		
		/**
		 * It creates the html element by setting properties of each html elements using 
		 * attribute values from xml and returns the html element.
		 * @returns the html content of the element
		 */
		function _getHtml(child,childIndx){
			var elementObj = new Element.Utility();
			var content = "";
    		
    		elementObj.setType(child[childIndx].tagName.toLowerCase()); // set type of element
    		content = child[childIndx].childNodes[0];
    		
    		if(child[childIndx].parentNode.hasAttribute('isHead')){
    			elementObj.setisHead("yes");
    		}
    		if(content!= null){
    			elementObj.setContent(content.nodeValue);
    		}
    		if( child[childIndx].hasAttribute('id')){
    			elementObj.setID(child[childIndx].getAttribute('id'));
		    }
    		if(child[childIndx].hasAttribute('class')){
    			elementObj.setClass(child[childIndx].getAttribute('class'));
    		}
    		if(child[childIndx].hasAttribute('name')){
    			elementObj.setName(child[childIndx].getAttribute('name'));
    		}
    		if(child[childIndx].hasAttribute('style')){
    			elementObj.setStyle(child[childIndx].getAttribute('style'));
    		} 
    		if(child[childIndx].hasAttribute('value')){
    			elementObj.setValue(child[childIndx].getAttribute('value'));
    		} 
    		if((elementObj.getType() == 'checkbox') || 
    			(elementObj.getType() == 'radio')){
    			if(child[childIndx].hasAttribute('is_checked')){
    				elementObj.setIsChecked(child[childIndx].getAttribute('is_checked'));
    			} 
    		} 
    		var text= ElementFactory.getElement(elementObj);
    		return text;
		}

		/**
		 * Traverse through each cells in the html table. Take values
		 * of each element in the cell. Update corresponding xml fields
		 * with these values.
		**/
		 function _saveXML(){
		 	var rowCount = 0;
		 	var mainChild = xmlDoc.getElementsByTagName(ParseXMLContent.Constants.ROWNAME);
			
           $(ParseXMLContent.Constants.TABLEID).each(function(){
           	
           		var xmlRow = mainChild[rowCount].childNodes;
           		var colCount = 0;
	           
	           $(this).find('td').each(function(){
		           	var elementObj = this.childNodes[0];
		            var xmlCol = xmlRow[colCount].childNodes[0];
		            _modifyXML(elementObj,xmlCol);
		           	colCount++;
	           })
	           rowCount++;
           })
           var tempXML = _xmlToString();
           var xmlConObj = $('#xml_container');
           xmlConObj.children().remove();
           xmlConObj.append('<h2>New XML</h2>');
           xmlConObj.append('<p></p>');
           xmlConObj.children('p').text(tempXML);
           xmlConObj.append('<h2>Old XML</h2>');
           xmlConObj.append('<p></p>');
           xmlConObj.children('p:last-child').text(xml);
           htmlContainer.empty();
           btnSave.css('display', 'none');
           xml = tempXML;
		}
        
        /**
         * Modify the xml by taking the values of  each elements from the table
         * and update the corresponding fields in the XML
        **/
        function _modifyXML(elementObj,xmlCol){
        	var val = "";
        	var elmName = (elementObj.nodeName).toLowerCase();
        	if(elmName == 'input'){
        		elmName = elementObj.getAttribute('type');
        	}
        	switch(elmName){
        		case ElementProperty.Constants.CHECKBOX:
        			 xmlCol.setAttribute("is_checked",elementObj.checked);
        			 break;

				case ElementProperty.Constants.RADIOBUTTON:
					 xmlCol.setAttribute("is_checked",elementObj.checked);
					 break;
				case ElementProperty.Constants.TEXTBOX:
					 val = $(elementObj).val();
					 xmlCol.setAttribute("value",val);
					 break;
				default:
					break;
			}
        }
       
        /**
         *Convert XMLObject to XML String
         *
         **/
        function _xmlToString() { 

		    var xmlString;
		    if (window.ActiveXObject){//IE
		        xmlString = xmlDoc.xml;
		    }
		    else{// code for Mozilla, Firefox, Opera, etc.
		        xmlString = (new XMLSerializer()).serializeToString(xmlDoc);
		    }
		    return xmlString;
		}  
		
		return {
        	//Initializes the elements
            initialize: function() {
              	xml = '<Container><row ><column isHead="yes"><label>Elements</label></column><column isHead="yes"><label>Choose</label></column>'
	            	+ '<column isHead="yes"><label>Yes/No(default:Yes)</label></column></row><row><column><label>Name</label></column><column><CheckBox ></CheckBox>'
	            	+ '</column><column ><radio></radio></column></row><row><column><text ></text></column><column><checkbox ></checkbox>'
	            	+ '</column><column ><radio></radio></column></row><row><column><text ></text></column><column><checkbox ></checkbox>'
	            	+ '</column><column ><radio></radio></column></row></Container>';
	            $('#xml_container p').text(xml);
            	_initializeXMLParser();
			}
		}
	}
}