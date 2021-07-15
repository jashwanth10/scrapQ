'use strict';

var app = angular.module('chartOrg', []);
var max_level = 1;
fetch("data/org-tree-data.json")
    .then(function(resp){
        return resp.json();
    })
    .then(function(data){
        console.log(data);
        traverse(data[0],1);
        console.log(max_level,"maxlevel");
    });

var nodes = []
function traverse(node,level){
    var temp;
   
    temp = {"id": node.userId,"pid":node.ownerId, "name": node.userName,"tags":[(level).toString()],"img": "https://cdn.balkan.app/shared/3.jpg","mobile":node.userMobile,"link":'<a target="_blank" href=https://www.google.com>hello</a>'};
    // console.log(node.children)
    nodes.push(temp)
    if('children' in node){
        node.children.forEach(element => {
            traverse(element,level+1);
            if(level+1>max_level)
            {
                max_level = level+1;
            }
        });
    }
    // for(var child in node.children){
    //     console.log("Children: ", child);
    //     traverse(child, node.userId);
    // }
}


OrgChart.templates.myTemplate = Object.assign({}, OrgChart.templates.ula);
OrgChart.templates.myTemplate.node = '<circle cx="100" cy="100" r="100" fill="#4D4D4D" stroke-width="1" stroke="#1C1C1C"></circle>'; 
OrgChart.templates.myTemplate.node ='<line x1="0" y1="0" x2="250" y2="0" stroke-width="20" stroke="#039BE5"></line>' +'<rect x="0" y="0" height="120" width="250" fill="#ffffff" stroke-width="1" stroke="#aeaeae"></rect>'


OrgChart.templates.green = Object.assign({}, OrgChart.templates.ula);
OrgChart.templates.green.node = '<line x1="0" y1="0" x2="250" y2="0" stroke-width="20" stroke="#000000"></line>' +'<rect x="0" y="0" height="120" width="250" fill="#ffffff" stroke-width="1" stroke="#aeaeae"></rect>'

OrgChart.templates.red = Object.assign({}, OrgChart.templates.ula);
OrgChart.templates.red.node = '<line x1="0" y1="0" x2="250" y2="0" stroke-width="20" stroke="red"></line>' +'<rect x="0" y="0" height="120" width="250" fill="#ffffff" stroke-width="1" stroke="#aeaeae"></rect>'


OrgChart.templates.blue = Object.assign({}, OrgChart.templates.ula);
OrgChart.templates.blue.node = '<line x1="0" y1="0" x2="250" y2="0" stroke-width="20" stroke="blue"></line>' +'<rect x="0" y="0" height="120" width="250" fill="#ffffff" stroke-width="1" stroke="#aeaeae"></rect>'


OrgChart.templates.yellow = Object.assign({}, OrgChart.templates.ula);
OrgChart.templates.yellow.node = '<line x1="0" y1="0" x2="250" y2="0" stroke-width="20" stroke="yellow"></line>' +'<rect x="0" y="0" height="120" width="250" fill="#ffffff" stroke-width="1" stroke="#aeaeae"></rect>'

// var just_name = 
// OrgChart.templates.node_1 = Object.assign({}, OrgChart.templates.ula);
// OrgChart.templates.node_1.node = '<line x1="0" y1="0" x2="250" y2="0" stroke-width="20" stroke="pink"></line>' +'<rect x="0" y="0" height="120" width="250" fill="#ffffff" stroke-width="1" stroke="#aeaeae"></rect>'
OrgChart.templates.ula.field_3 = 
'<text class="field_3" style="font-size: 14px;" fill="#000000" x="120" y="100" text-anchor="right-bottom">{val}</text>';
function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }
  
  


angular.
    module('chartOrg').
    component('chartOrg', {
        templateUrl: 'chart-org/chart-org.template.html' ,
        controller: function chartOrgController(){

            console.log(nodes);
            for(var teee=1;teee<=max_level;teee++)
            {
                var name_string = "node"+'_'+teee.toString();
                console.log(name_string);
                // OrgChart.templates.name_string = Object.assign({}, OrgChart.templates.ula);
                OrgChart.templates[name_string] = Object.assign({}, OrgChart.templates.ula);
                var stroke_color = getRandomColor()

                // OrgChart.templates[name_string].node = '<line x1="0" y1="0" x2="250" y2="0" stroke-width="20" stroke="pink"></line>' +'<rect x="0" y="0" height="120" width="250" fill="#ffffff" stroke-width="1" stroke="#aeaeae"></rect>'
                OrgChart.templates[name_string].node = `<line x1="0" y1="0" x2="250" y2="0" stroke-width="20" stroke="${stroke_color}"></line>' +'<rect x="0" y="0" height="120" width="250" fill="#ffffff" stroke-width="1" stroke="#aeaeae"></rect>`
                // console.log(stroke_color,"strokee colorrr");
                // OrgChart.templates.name_string.node = '<line x1="0" y1="0" x2="250" y2="0" stroke-width="20" stroke="black"></line>' +'<rect x="0" y="0" height="120" width="250" fill="#ffffff" stroke-width="1" stroke="#aeaeae"></rect>'
               
            
            }   
        
            this.chart = new OrgChart(document.getElementById("hello"), {
                mouseScrool: OrgChart.action.scroll,
                // gives different hierarchy mixed
                layout: OrgChart.mixed, 
                nodeMouseClick: OrgChart.action.none,
                orientation: OrgChart.orientation.left_top,
                // height:100,

                template: "myTemplate",
                
                tags :{
                    "1":{
                        template:"node_1"
                    },
                    "2":{
                        template:"node_2"
                    },
                    "3":{
                        template:"node_3"
                    },
                    "4":{
                        template:"node_4"
                    },
                },
                miniMap: true,
                nodeBinding: {
                    field_0: "name",
                    field_2:"work",
                    field_1:"mobile",
                    img_0 : "img",
                    field_3:"link"
                    
                },
                toolbar: {
                    fullScreen: true,
                    zoom: true,
                    fit: true,
                    expandAll: true
                  },
                nodes: nodes
            });


            this.chart.on('field', function(sender, args){
                console.log("checkkk");
                var name = args.data["name"];
                              var link = args.data["link"];
                  args.value = '<a target="_blank" href="' + link + '">' + name +  '</a>';
          });

         
         
        
          
        },
        
    });


