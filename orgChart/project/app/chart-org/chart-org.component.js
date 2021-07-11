'use strict';

var app = angular.module('chartOrg', []);

fetch("data/org-tree-data.json")
    .then(function(resp){
        return resp.json();
    })
    .then(function(data){
        console.log(data);
        traverse(data[0]);
    });

var nodes = []
function traverse(node){
    var temp;
   
    temp = {"id": node.userId,"pid":node.ownerId, "name": node.userName};
    // console.log(node.children)
    nodes.push(temp)
    if('children' in node){
        node.children.forEach(element => {
            traverse(element);
        });
    }
    // for(var child in node.children){
    //     console.log("Children: ", child);
    //     traverse(child, node.userId);
    // }
}
console.log(nodes)

angular.
    module('chartOrg').
    component('chartOrg', {
        templateUrl: 'chart-org/chart-org.template.html' ,
        controller: function chartOrgController(){
            console.log(nodes);
            this.chart = new OrgChart(document.getElementById("hello"), {
                nodeBinding: {
                    field_0: "name",
                    field_1:"work",
                    field_2:"mobile",
                    img_0 : "img"
                },
                nodes: nodes
            });

        },
    });


    // [
    //     { id: 1, name: "Amber McKenzie" ,work:"hello",mobile:"1111",img: "https://cdn.balkan.app/shared/2.jpg"},
    //     { id: 2, pid: 1, name: "Ava Field",work:"hello",mobile:"1111" ,img: "https://cdn.balkan.app/shared/3.jpg"},
    //     { id: 3, pid: 1, name: "Peter Stevens" ,work:"hello",mobile:"1111",img:"https://cdn.balkan.app/shared/4.jpg"},
    //     { id: 4, pid: 2, name: "Peter vens" ,work:"hello",mobile:"1111",img:"https://cdn.balkan.app/shared/4.jpg"},
    //     { id: 5, pid: 2, name: "Peter vens" ,work:"hello",mobile:"1111",img:"https://cdn.balkan.app/shared/4.jpg"},
    //     { id: 6, pid: 2, name: "Peter vens" ,work:"hello",mobile:"1111",img:"https://cdn.balkan.app/shared/4.jpg"},
    //     { id: 7, pid: 3, name: "Peter vens" ,work:"hello",mobile:"1111",img:"https://cdn.balkan.app/shared/4.jpg"},
    //     { id: 8, pid: 3, name: "Peter vens" ,work:"hello",mobile:"1111",img:"https://cdn.balkan.app/shared/4.jpg"},
    //     { id: 9, pid: 3, name: "Peter vens" ,work:"hello",mobile:"1111",img:"https://cdn.balkan.app/shared/4.jpg"},
    // ]