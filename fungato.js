//referenciar las posiciones celda 1 celda 2 etc luego hacer una funcion con foreach y incluirla ahi

 let c1= document.getElementById("c1");
 let c2= document.getElementById("c2");
 let c3= document.getElementById("c3");
 let c4= document.getElementById("c4");
 let c5= document.getElementById("c5");
 let c6= document.getElementById("c6");
 let c7= document.getElementById("c7");
 let c8= document.getElementById("c8");
 let c9= document.getElementById("c9");

 let cuadros = [c1,c2,c3,c4,c5,c6,c7,c8,c9]
 
 function juegito() {
    cuadros.forEach(celdita => celdita.addEventListener("click", function(){
        celdita.innerHTML="X"

    }))
    
 }