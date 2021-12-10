
   function narysujgraf(A) {
     var n = A.length;
	 var X = new Array(n);
	 var Y = new Array(n);
	 var canvas = document.getElementById('canvas');
	 var xsr = canvas.width/2;
	 var ysr = canvas.height/2;
	 // uklad na okregu
	 for (var i=0;i<n;i++) { 
	 X[i] = Math.floor(xsr*(1+0.8*Math.sin((2*Math.PI/n)*i)));
	 Y[i] = Math.floor(ysr*(1-0.8*Math.cos((2*Math.PI/n)*i)));
		}
    
     // rozklad losowy
	 for (var i=0;i<n;i++) { X[i] = 10+Math.floor(Math.random()*(canvas.width-20));
	                         Y[i] = 10+Math.floor(Math.random()*(canvas.height-20));
	                        }
	 var centrum_x = 0;
	 var centrum_y = 0;
     for (var i=0;i<n;i++) { centrum_x+=X[i]; centrum_y+=Y[i]; }
 	 centrum_x = Math.floor(centrum_x/n);
	 centrum_y = Math.floor(centrum_y/n);
	 
	 // przesuniecie do centrum
	 var dx = canvas.width/2 - centrum_x;
	 var dy = canvas.height/2 - centrum_y;
	 
	 for (var i=0;i<n;i++) {
	  X[i]+=dx;
	  Y[i]+=dy;
	 }
	 
	 // normalizacja
	 var max_x = Number.MIN_VALUE;
     var min_x = Number.MAX_VALUE;	 
	 var max_y = Number.MIN_VALUE;
     var min_y = Number.MAX_VALUE;	 

	 for (var i=0;i<n;i++) { 
	  if (X[i]>max_x) max_x=X[i];
	  if (X[i]<min_x) min_x=X[i];
	  if (Y[i]>max_y) max_y=Y[i];
	  if (Y[i]<min_y) min_y=Y[i];
	 }
	 // Dx = max_x - min_x
	 // 
	 for (var i=0;i<n;i++) {
	  X[i]= Math.floor(20+(X[i]-min_x)*(canvas.width-40)/(max_x - min_x));
	  Y[i]= Math.floor(20+(Y[i]-min_y)*(canvas.width-40)/(max_y - min_y));;
	 }
	 
	 
	 var c_x = 0;
	 var c_y = 0;
     for (var i=0;i<n;i++) { c_x+=X[i]; c_y+=Y[i]; }
 	 c_x = Math.floor(c_x/n);
	 c_y = Math.floor(c_y/n);
	 
	 
     if (canvas.getContext) {
       var c = canvas.getContext('2d');
	        c.clearRect(0, 0, canvas.width, canvas.height);
 		    c.strokeStyle = 'black';
            c.lineWidth = 2;
            c.lineCap = 'butt';

	   for (var i=1;i<n;i++) 
		  for (var j=0;j<i;j++) if (A[i][j]==1) 
		   { 
             c.beginPath();
             c.moveTo(X[i], Y[i]);
             c.lineTo(X[j], Y[j]);
             c.stroke();
		   }
	     c.fillStyle='red';
         for (var i=0;i<n;i++) { c.beginPath();
		                         c.arc(X[i], Y[i], 5, 0, Math.PI*2,true); 
		                         c.closePath();
                                 c.fill();
							    }
		 // srodek masy nie przesuniety
		 c.fillStyle='blue'; 
          { c.beginPath();
		     c.arc(centrum_x, centrum_y, 5, 0, Math.PI*2,true); 
		     c.closePath();
             c.fill();
		  }
         // srodek masy nie przesuniety
		 c.fillStyle='green'; 
          { c.beginPath();
		     c.arc(c_x, c_y, 5, 0, Math.PI*2,true); 
		     c.closePath();
             c.fill();
		  }		  
       }
   }
   
   function run() 
   {
	 var A = [[0,1,1,1],[1,0,1,1],[1,1,0,1],[1,1,1,0]];
     narysujgraf(A);     
	}
   
      
 