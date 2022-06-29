
//Change this to true for a stretchy canvas!
//
var RESIZEABLE_CANVAS=false;

//Start us up!
//
window.onload=function( e ){

	if( RESIZEABLE_CANVAS ){
		window.onresize=function( e ){
			var canvas=document.getElementById( "GameCanvas" );

			//This vs window.innerWidth, which apparently doesn't account for scrollbar?
			var width=document.body.clientWidth;
			
			//This vs document.body.clientHeight, which does weird things - document seems to 'grow'...perhaps canvas resize pushing page down?
			var height=window.innerHeight;			

			canvas.width=width;
			canvas.height=height;
		}
		window.onresize( null );
	}
	
	game_canvas=document.getElementById( "GameCanvas" );
	
	game_console=document.getElementById( "GameConsole" );

	try{
	
		bbInit();
		bbMain();
		
		if( game_runner!=null ) game_runner();
		
	}catch( err ){
	
		showError( err );
	}
}

//Globals
var game_canvas;
var game_console;
var game_runner;

//${METADATA_BEGIN}
var META_DATA="[1-3.png];type=image/png;width=4000;height=200;\n[1-4.png];type=image/png;width=1800;height=200;\n[2-4.png];type=image/png;width=4000;height=200;\n[3-0.png];type=image/png;width=2000;height=200;\n[4-1.png];type=image/png;width=2000;height=200;\n[angel_verdana.png];type=image/png;width=256;height=256;\n[arial.png];type=image/png;width=3040;height=32;\n[arial_0.png];type=image/png;width=3040;height=32;\n[arial_30.png];type=image/png;width=256;height=256;\n[arrangethetiles.png];type=image/png;width=474;height=96;\n[audio/applebite.mp3];type=audio/mpeg;\n[audio/automobile.mp3];type=audio/mpeg;\n[audio/beatbouros.mp3];type=audio/mpeg;\n[audio/beatbouros.ogg];type=audio/ogg;length=7528320;hertz=44100;\n[audio/cartoon1.mp3];type=audio/mpeg;\n[audio/cartoon3.mp3];type=audio/mpeg;\n[audio/chant.mp3];type=audio/mpeg;\n[audio/digitaldrop.mp3];type=audio/mpeg;\n[audio/down.mp3];type=audio/mpeg;\n[audio/drop.mp3];type=audio/mpeg;\n[audio/electro.mp3];type=audio/mpeg;\n[audio/equine.mp3];type=audio/mpeg;\n[audio/heaven.mp3];type=audio/mpeg;\n[audio/hit.mp3];type=audio/mpeg;\n[audio/knock.mp3];type=audio/mpeg;\n[audio/robot.mp3];type=audio/mpeg;\n[audio/rumble.mp3];type=audio/mpeg;\n[audio/up.mp3];type=audio/mpeg;\n[audio/valsbouros.mp3];type=audio/mpeg;\n[background.png];type=image/png;width=1440;height=900;\n[btn-loading.png];type=image/png;width=126;height=30;\n[btn-next.png];type=image/png;width=126;height=30;\n[btn_play.png];type=image/png;width=126;height=29;\n[btn_restart.png];type=image/png;width=126;height=29;\n[buttonprogress.png];type=image/png;width=12500;height=28;\n[clicktheball.png];type=image/png;width=193;height=156;\n[game_over.png];type=image/png;width=292;height=190;\n[goldbergboros.png];type=image/png;width=1000;height=400;\n[goldberg_comic.jpg];type=image/jpg;width=500;height=299;\n[highlight.png];type=image/png;width=200;height=200;\n[loop.png];type=image/png;width=628;height=283;\n[mojo_font.png];type=image/png;width=864;height=13;\n[Original Files/tile06-3-2.jpg];type=image/jpg;width=7676;height=202;\n[score.png];type=image/png;width=153;height=97;\n[thestoryofaball.png];type=image/png;width=408;height=286;\n[tile006-1-2.jpg];type=image/jpg;width=9090;height=202;\n[tile006-1-2.png];type=image/png;width=9090;height=202;\n[tile01-1-4.jpg];type=image/jpg;width=1800;height=200;\n[tile01-1-4.png];type=image/png;width=1800;height=200;\n[tile01-2-4.jpg];type=image/jpg;width=4000;height=200;\n[tile01-2-4.png];type=image/png;width=4000;height=200;\n[tile01-3-0.jpg];type=image/jpg;width=2000;height=200;\n[tile01-3-0.png];type=image/png;width=2000;height=200;\n[tile01-4-1.jpg];type=image/jpg;width=2000;height=200;\n[tile01-4-1.png];type=image/png;width=2000;height=200;\n[tile02-1-3.jpg];type=image/jpg;width=4646;height=202;\n[tile02-1-3.png];type=image/png;width=4646;height=202;\n[tile02-2-4.jpg];type=image/jpg;width=12524;height=202;\n[tile02-2-4.png];type=image/png;width=12524;height=202;\n[tile02-3-1.jpg];type=image/jpg;width=4800;height=200;\n[tile02-3-1.png];type=image/png;width=4800;height=200;\n[tile02-4-3.jpg];type=image/jpg;width=15152;height=202;\n[tile02-4-3.png];type=image/png;width=15152;height=202;\n[tile03-1-4.jpg];type=image/jpg;width=11200;height=200;\n[tile03-1-4.png];type=image/png;width=11200;height=200;\n[tile03-2-4.jpg];type=image/jpg;width=17600;height=200;\n[tile03-2-4.png];type=image/png;width=17600;height=200;\n[tile03-3-4.jpg];type=image/jpg;width=9400;height=200;\n[tile03-3-4.png];type=image/png;width=9400;height=200;\n[tile03-4-4.jpg];type=image/jpg;width=6800;height=200;\n[tile03-4-4.png];type=image/png;width=6800;height=200;\n[tile04-1-0.jpg];type=image/jpg;width=13736;height=202;\n[tile04-1-0.png];type=image/png;width=13736;height=202;\n[tile04-2-0.jpg];type=image/jpg;width=12928;height=202;\n[tile04-2-0.png];type=image/png;width=12928;height=202;\n[tile04-3-0.jpg];type=image/jpg;width=14140;height=202;\n[tile04-3-0.png];type=image/png;width=14140;height=202;\n[tile04-4-0.jpg];type=image/jpg;width=12726;height=202;\n[tile04-4-0.png];type=image/png;width=12726;height=202;\n[tile05-1-4.jpg];type=image/jpg;width=4848;height=202;\n[tile05-1-4.png];type=image/png;width=4848;height=202;\n[tile05-2-3.jpg];type=image/jpg;width=2828;height=202;\n[tile05-2-3.png];type=image/png;width=2828;height=202;\n[tile05-3-2.jpg];type=image/jpg;width=3000;height=200;\n[tile05-3-2.png];type=image/png;width=3000;height=200;\n[tile05-4-1.jpg];type=image/jpg;width=5000;height=200;\n[tile05-4-1.png];type=image/png;width=5000;height=200;\n[tile06-1-2.jpg];type=image/jpg;width=9090;height=202;\n[tile06-1-2.png];type=image/png;width=9090;height=202;\n[tile06-2-4.jpg];type=image/jpg;width=5454;height=202;\n[tile06-2-4.png];type=image/png;width=5454;height=202;\n[tile06-3-2.jpg];type=image/jpg;width=7676;height=202;\n[tile06-3-2.png];type=image/png;width=7676;height=202;\n[tile06-4-2.jpg];type=image/jpg;width=7878;height=202;\n[tile06-4-2.png];type=image/png;width=7878;height=202;\n[tile07-1-1.jpg];type=image/jpg;width=4600;height=200;\n[tile07-1-1.png];type=image/png;width=4600;height=200;\n[tile07-2-4.jpg];type=image/jpg;width=15000;height=200;\n[tile07-2-4.png];type=image/png;width=15000;height=200;\n[tile07-4-2.jpg];type=image/jpg;width=15800;height=200;\n[tile07-4-2.png];type=image/png;width=15800;height=200;\n[tile07-4-2a.jpg];type=image/jpg;width=15800;height=200;\n[tile07-4-2a.png];type=image/png;width=15800;height=200;\n[tile08-1-2.jpg];type=image/jpg;width=5252;height=202;\n[tile08-1-2.png];type=image/png;width=5252;height=202;\n[tile09-1-2.jpg];type=image/jpg;width=13400;height=200;\n[tile09-1-2.png];type=image/png;width=13400;height=200;\n[tile09-2-1.jpg];type=image/jpg;width=13600;height=200;\n[tile09-2-1.png];type=image/png;width=13600;height=200;\n[tile09-2-3.jpg];type=image/jpg;width=18200;height=200;\n[tile09-2-3.png];type=image/png;width=18200;height=200;\n[tile09-3-1.jpg];type=image/jpg;width=10400;height=200;\n[tile09-3-1.png];type=image/png;width=10400;height=200;\n[tile09-4-2.jpg];type=image/jpg;width=9200;height=200;\n[tile09-4-2.png];type=image/png;width=9200;height=200;\n[Tile1.png];type=image/png;width=4000;height=200;\n[tile10-1-2.jpg];type=image/jpg;width=4400;height=200;\n[tile10-1-2.png];type=image/png;width=4400;height=200;\n[tile10-2-1.jpg];type=image/jpg;width=3200;height=200;\n[tile10-2-1.png];type=image/png;width=3200;height=200;\n[tile10-3-1.jpg];type=image/jpg;width=12200;height=200;\n[tile10-3-1.png];type=image/png;width=12200;height=200;\n[tile10-4-2.jpg];type=image/jpg;width=5600;height=200;\n[tile10-4-2.png];type=image/png;width=5600;height=200;\n[tile11-1-1.jpg];type=image/jpg;width=5800;height=200;\n[tile11-1-1.png];type=image/png;width=5800;height=200;\n[tile11-2-3.jpg];type=image/jpg;width=12400;height=200;\n[tile11-2-3.png];type=image/png;width=12400;height=200;\n[tile11-3-1.jpg];type=image/jpg;width=6400;height=200;\n[tile11-3-1.png];type=image/png;width=6400;height=200;\n[tile11-4-2.jpg];type=image/jpg;width=3400;height=200;\n[tile11-4-2.png];type=image/png;width=3400;height=200;\n[tile12-1-1.jpg];type=image/jpg;width=3000;height=200;\n[tile12-1-1.png];type=image/png;width=3000;height=200;\n[tile12-2-3.jpg];type=image/jpg;width=8800;height=200;\n[tile12-2-3.png];type=image/png;width=8800;height=200;\n[tile12-3-1.jpg];type=image/jpg;width=8600;height=200;\n[tile12-3-1.png];type=image/png;width=8600;height=200;\n[tile12-4-4.jpg];type=image/jpg;width=7400;height=200;\n[tile12-4-4.png];type=image/png;width=7400;height=200;\n[tile13-2-4.jpg];type=image/jpg;width=11600;height=200;\n[tile13-2-4.png];type=image/png;width=11600;height=200;\n[tile13-4-2.jpg];type=image/jpg;width=6000;height=200;\n[tile13-4-2.png];type=image/png;width=6000;height=200;\n";

//${METADATA_END}
function getMetaData( path,key ){	
	var i=META_DATA.indexOf( "["+path+"]" );
	if( i==-1 ) return "";
	i+=path.length+2;

	var e=META_DATA.indexOf( "\n",i );
	if( e==-1 ) e=META_DATA.length;

	i=META_DATA.indexOf( ";"+key+"=",i )
	if( i==-1 || i>=e ) return "";
	i+=key.length+2;

	e=META_DATA.indexOf( ";",i );
	if( e==-1 ) return "";

	return META_DATA.slice( i,e );
}

function loadString( path ){
	if( path=="" ) return "";
//${TEXTFILES_BEGIN}
		else if( path=="angel_verdana.txt" ) return "id,x,y,width,height,xoffset,yoffset,xadvance,page,chnl\r\n32,185,111,3,3,-1,26,9,0,15\r\n33,16,95,5,21,3,7,10,0,15\r\n34,123,111,10,9,1,6,12,0,15\r\n35,77,50,18,21,1,7,21,0,15\r\n36,0,0,16,27,1,6,17,0,15\r\n37,96,27,26,21,1,7,28,0,15\r\n38,186,23,20,21,0,7,19,0,15\r\n39,134,111,5,9,1,6,7,0,15\r\n40,47,0,10,27,1,6,12,0,15\r\n41,58,0,10,27,1,6,12,0,15\r\n42,42,113,14,14,1,6,17,0,15\r\n43,22,95,18,18,2,10,21,0,15\r\n44,77,113,7,10,1,22,9,0,15\r\n45,154,111,10,4,1,17,12,0,15\r\n46,148,111,5,6,2,22,9,0,15\r\n47,116,0,13,26,-1,6,12,0,15\r\n48,96,71,15,21,1,7,17,0,15\r\n49,203,67,13,21,2,7,17,0,15\r\n50,112,71,15,21,1,7,17,0,15\r\n51,0,73,15,21,1,7,17,0,15\r\n52,204,45,16,21,0,7,17,0,15\r\n53,32,73,15,21,1,7,17,0,15\r\n54,80,72,15,21,1,7,17,0,15\r\n55,48,73,15,21,1,7,17,0,15\r\n56,64,73,15,21,1,7,17,0,15\r\n57,16,73,15,21,1,7,17,0,15\r\n58,249,89,5,17,3,11,12,0,15\r\n59,247,23,7,21,2,11,12,0,15\r\n60,105,93,17,17,2,10,21,0,15\r\n61,105,111,17,9,2,14,21,0,15\r\n62,87,94,17,17,2,10,21,0,15\r\n63,217,67,13,21,1,7,14,0,15\r\n64,154,0,24,24,1,7,26,0,15\r\n65,123,27,20,21,-1,7,18,0,15\r\n66"+
",238,45,16,21,2,7,18,0,15\r\n67,96,49,18,21,0,7,18,0,15\r\n68,151,49,17,21,2,7,20,0,15\r\n69,159,71,14,21,2,7,16,0,15\r\n70,174,69,14,21,2,7,15,0,15\r\n71,207,23,19,21,0,7,20,0,15\r\n72,221,45,16,21,2,7,20,0,15\r\n73,0,95,9,21,1,7,11,0,15\r\n74,243,67,11,21,0,7,12,0,15\r\n75,115,49,17,21,2,7,18,0,15\r\n76,189,67,13,21,2,7,14,0,15\r\n77,20,51,18,21,2,7,22,0,15\r\n78,128,71,15,21,2,7,19,0,15\r\n79,144,27,20,21,0,7,20,0,15\r\n80,144,71,14,21,2,7,16,0,15\r\n81,95,0,20,26,0,7,20,0,15\r\n82,39,51,18,21,2,7,18,0,15\r\n83,187,45,16,21,1,7,18,0,15\r\n84,0,51,19,21,-1,7,16,0,15\r\n85,133,49,17,21,1,7,19,0,15\r\n86,165,25,20,21,-1,7,18,0,15\r\n87,69,28,26,21,0,7,26,0,15\r\n88,58,51,18,21,0,7,18,0,15\r\n89,227,23,19,21,-1,7,16,0,15\r\n90,169,47,17,21,1,7,18,0,15\r\n91,79,0,9,27,2,6,12,0,15\r\n92,130,0,13,26,0,6,12,0,15\r\n93,69,0,9,27,1,6,12,0,15\r\n94,57,113,19,12,1,7,21,0,15\r\n95,165,111,19,3,-1,28,17,0,15\r\n96,140,111,7,7,3,4,17,0,15\r\n97,188,91,15,17,0,11,16,0,15\r\n98,32,28,15,22,1,6,16,0,15\r\n99,204,89,14,17,0,11,14,0,15\r\n100,16,28,15,22,0,6,16,0,15\r\n101,140,93,15,17,0,11,15,"+
"0,15\r\n102,243,0,12,22,-1,6,9,0,15\r\n103,227,0,15,22,0,11,16,0,15\r\n104,48,28,14,22,1,6,16,0,15\r\n105,10,95,5,21,1,7,7,0,15\r\n106,144,0,9,26,-1,7,9,0,15\r\n107,211,0,15,22,1,6,15,0,15\r\n108,63,28,5,22,1,6,7,0,15\r\n109,41,95,23,17,2,11,25,0,15\r\n110,219,89,14,17,1,11,16,0,15\r\n111,123,93,16,17,0,11,16,0,15\r\n112,0,28,15,22,1,11,16,0,15\r\n113,195,0,15,22,0,11,16,0,15\r\n114,30,114,11,17,1,11,11,0,15\r\n115,234,89,14,17,0,11,14,0,15\r\n116,231,67,11,21,-1,7,10,0,15\r\n117,0,117,14,17,1,11,16,0,15\r\n118,156,93,15,17,0,11,15,0,15\r\n119,65,95,21,17,0,11,21,0,15\r\n120,172,93,15,17,0,11,15,0,15\r\n121,179,0,15,22,0,11,15,0,15\r\n122,15,117,14,17,0,11,14,0,15\r\n123,17,0,14,27,1,6,17,0,15\r\n124,89,0,5,27,4,6,12,0,15\r\n125,32,0,14,27,2,6,17,0,15\r\n126,85,113,19,9,1,14,21,0,15\r\n\r\nfirst,second,amount\r\n39,65,-1\r\n45,65,-1\r\n45,74,-1\r\n45,84,-2\r\n45,86,-1\r\n45,87,-1\r\n45,88,-1\r\n45,89,-2\r\n45,118,-1\r\n45,120,-1\r\n45,121,-1\r\n45,122,-1\r\n46,44,-2\r\n46,45,-2\r\n65,45,-1\r\n65,84,-2\r\n65,86,-1\r\n65,87,-1\r\n65,89,-1\r\n65,118,-1\r\n65,121,-1\r\n66,84,-1\r\n67,45,-1\r\n68,44,-1\r\n68,46,-1\r\n"+
"68,84,-1\r\n70,44,-4\r\n70,46,-4\r\n70,58,-1\r\n70,63,1\r\n70,65,-1\r\n70,97,-1\r\n70,101,-1\r\n70,111,-1\r\n75,45,-1\r\n75,97,-1\r\n75,101,-1\r\n75,111,-1\r\n75,117,-1\r\n75,118,-1\r\n75,119,-1\r\n75,121,-1\r\n76,39,-2\r\n76,45,-2\r\n76,74,1\r\n76,84,-2\r\n76,86,-1\r\n76,87,-1\r\n76,89,-2\r\n76,118,-1\r\n76,121,-1\r\n79,84,-1\r\n80,44,-4\r\n80,46,-4\r\n80,65,-1\r\n80,97,-1\r\n80,101,-1\r\n80,111,-1\r\n82,45,-1\r\n82,84,-1\r\n82,97,-1\r\n82,101,-1\r\n82,111,-1\r\n82,121,-1\r\n84,44,-4\r\n84,45,-2\r\n84,46,-4\r\n84,58,-3\r\n84,63,1\r\n84,65,-2\r\n84,67,-1\r\n84,71,-1\r\n84,79,-1\r\n84,84,-1\r\n84,97,-3\r\n84,99,-3\r\n84,101,-3\r\n84,103,-3\r\n84,111,-3\r\n84,114,-3\r\n84,115,-2\r\n84,117,-3\r\n84,118,-3\r\n84,119,-3\r\n84,121,-3\r\n84,122,-2\r\n86,44,-4\r\n86,45,-1\r\n86,46,-4\r\n86,58,-1\r\n86,65,-1\r\n86,97,-1\r\n86,101,-1\r\n86,111,-1\r\n86,117,-1\r\n86,121,-1\r\n87,44,-4\r\n87,45,-1\r\n87,46,-3\r\n87,58,-1\r\n87,65,-1\r\n87,97,-1\r\n87,101,-1\r\n87,111,-1\r\n87,114,-1\r\n87,117,-1\r\n87,121,-1\r\n88,45,-1\r\n88,97,-1\r\n88,101,-1\r\n88,111,-1\r\n88,121,-1\r\n89,44,-4\r\n89,45,-2\r\n89,46,-4\r\n89,58,-3\r\n89,65,-1\r\n89,97,-2\r\n89,100,-2\r\n89,101,-2\r\n89,103,-2\r\n89,109,-1\r\n89,110,-1\r\n89,11"+
"1,-2\r\n89,112,-1\r\n89,113,-2\r\n89,114,-1\r\n89,115,-1\r\n89,117,-1\r\n89,118,-1\r\n90,45,-1\r\n90,97,-1\r\n90,101,-1\r\n90,111,-1\r\n90,119,-1\r\n90,121,-1\r\n99,84,-1\r\n101,84,-2\r\n102,34,1\r\n102,39,1\r\n102,41,1\r\n102,42,1\r\n102,44,-2\r\n102,45,-1\r\n102,46,-2\r\n102,63,1\r\n102,92,1\r\n102,93,1\r\n102,125,1\r\n107,45,-1\r\n114,44,-4\r\n114,46,-4\r\n116,45,-1\r\n118,44,-2\r\n118,45,-1\r\n118,46,-2\r\n118,97,-1\r\n119,44,-1\r\n119,46,-1\r\n120,45,-1\r\n121,44,-2\r\n121,45,-1\r\n121,46,-2\r\n121,97,-1\r\n";
		else if( path=="arial.txt" ) return "id,x,y,width,height,xoffset,yoffset,xadvance,page,chnl\r\n32,1799,0,11,1,-5,17,5,0,15\r\n33,1260,0,12,13,-3,4,6,0,15\r\n34,1672,0,15,5,-4,4,6,0,15\r\n35,505,0,21,13,-5,4,10,0,15\r\n36,152,0,19,16,-4,3,10,0,15\r\n37,316,0,24,13,-4,4,16,0,15\r\n38,527,0,21,13,-4,4,12,0,15\r\n39,1688,0,12,5,-5,4,3,0,15\r\n40,78,0,15,17,-4,4,6,0,15\r\n41,62,0,15,17,-5,4,6,0,15\r\n42,1656,0,15,5,-4,4,7,0,15\r\n43,1357,0,20,10,-4,6,11,0,15\r\n44,1722,0,12,4,-3,15,5,0,15\r\n45,1756,0,15,2,-5,11,6,0,15\r\n46,1786,0,12,2,-3,15,5,0,15\r\n47,1171,0,16,13,-5,4,5,0,15\r\n48,849,0,19,13,-5,4,10,0,15\r\n49,1205,0,15,13,-3,4,10,0,15\r\n50,984,0,18,13,-4,4,10,0,15\r\n51,965,0,18,13,-4,4,10,0,15\r\n52,829,0,19,13,-5,4,10,0,15\r\n53,946,0,18,13,-4,4,10,0,15\r\n54,1041,0,18,13,-4,4,10,0,15\r\n55,908,0,18,13,-4,4,10,0,15\r\n56,889,0,18,13,-4,4,10,0,15\r\n57,1117,0,18,13,-4,4,10,0,15\r\n58,1565,0,12,10,-3,7,5,0,15\r\n59,1273,0,12,12,-3,7,5,0,15\r\n60,1598,0,19,9,-4,6,11,0,15\r\n61,1636,0,19,6,-4,7,11,0,15\r\n62,1578,0,19,9,-4,6,11,0,15\r\n63,1098,0,18,13,-4,4,10,0,15\r\n64,0,0,27,17,-4,4,18,0,15\r\n65,341,0,23,13,"+
"-6,4,11,0,15\r\n66,703,0,20,13,-4,4,12,0,15\r\n67,637,0,21,13,-4,4,13,0,15\r\n68,571,0,21,13,-4,4,13,0,15\r\n69,724,0,20,13,-4,4,12,0,15\r\n70,869,0,19,13,-4,4,11,0,15\r\n71,436,0,22,13,-4,4,14,0,15\r\n72,681,0,21,13,-4,4,13,0,15\r\n73,1221,0,12,13,-4,4,4,0,15\r\n74,1136,0,17,13,-4,4,9,0,15\r\n75,659,0,21,13,-4,4,12,0,15\r\n76,927,0,18,13,-4,4,10,0,15\r\n77,389,0,23,13,-4,4,15,0,15\r\n78,615,0,21,13,-4,4,13,0,15\r\n79,459,0,22,13,-4,4,14,0,15\r\n80,808,0,20,13,-4,4,12,0,15\r\n81,172,0,22,14,-4,4,14,0,15\r\n82,482,0,22,13,-4,4,13,0,15\r\n83,787,0,20,13,-4,4,12,0,15\r\n84,766,0,20,13,-4,4,12,0,15\r\n85,593,0,21,13,-4,4,13,0,15\r\n86,365,0,23,13,-6,4,11,0,15\r\n87,288,0,27,13,-5,4,17,0,15\r\n88,549,0,21,13,-5,4,11,0,15\r\n89,413,0,22,13,-5,4,12,0,15\r\n90,745,0,20,13,-5,4,11,0,15\r\n91,109,0,14,17,-4,4,5,0,15\r\n92,1154,0,16,13,-5,4,5,0,15\r\n93,94,0,14,17,-5,4,5,0,15\r\n94,1618,0,17,7,-5,4,7,0,15\r\n95,1735,0,20,2,-5,19,10,0,15\r\n96,1772,0,13,2,-4,4,6,0,15\r\n97,1455,0,18,10,-4,7,10,0,15\r\n98,1003,0,18,13,-4,4,10,0,15\r\n99,1493,0,18,10,-4,7,9,0,15\r\n100,1022,0,18,13,-4,4,10,0"+
",15\r\n101,1512,0,18,10,-4,7,10,0,15\r\n102,1188,0,16,13,-5,4,5,0,15\r\n103,254,0,18,14,-4,7,10,0,15\r\n104,1060,0,18,13,-4,4,10,0,15\r\n105,1234,0,12,13,-4,4,4,0,15\r\n106,124,0,14,17,-6,4,4,0,15\r\n107,1079,0,18,13,-4,4,9,0,15\r\n108,1247,0,12,13,-4,4,4,0,15\r\n109,1312,0,22,10,-4,7,14,0,15\r\n110,1398,0,18,10,-4,7,10,0,15\r\n111,1417,0,18,10,-4,7,10,0,15\r\n112,235,0,18,14,-4,7,10,0,15\r\n113,216,0,18,14,-4,7,10,0,15\r\n114,1549,0,15,10,-4,7,6,0,15\r\n115,1531,0,17,10,-4,7,9,0,15\r\n116,273,0,14,14,-5,3,5,0,15\r\n117,1436,0,18,10,-4,7,10,0,15\r\n118,1335,0,21,10,-6,7,9,0,15\r\n119,1286,0,25,10,-6,7,13,0,15\r\n120,1378,0,19,10,-5,7,8,0,15\r\n121,195,0,20,14,-6,7,9,0,15\r\n122,1474,0,18,10,-5,7,8,0,15\r\n123,45,0,16,17,-5,4,6,0,15\r\n124,139,0,12,17,-3,4,6,0,15\r\n125,28,0,16,17,-5,4,6,0,15\r\n126,1701,0,20,4,-5,9,11,0,15\r\n\r\nfirst,second,amount\r\n32,65,-1\r\n49,49,-1\r\n65,32,-1\r\n65,84,-1\r\n65,86,-1\r\n65,87,-1\r\n65,89,-1\r\n70,44,-2\r\n70,46,-2\r\n70,65,-1\r\n76,32,-1\r\n76,84,-1\r\n76,86,-1\r\n76,87,-1\r\n76,89,-1\r\n76,121,-1\r\n80,44,-2\r\n80,46,-2\r\n80,65,-1\r\n84,44,-2\r\n84,45,-1\r\n84,46,"+
"-2\r\n84,58,-2\r\n84,65,-1\r\n84,97,-2\r\n84,99,-2\r\n84,101,-2\r\n84,105,-1\r\n84,111,-2\r\n84,114,-1\r\n84,115,-2\r\n84,117,-1\r\n84,119,-1\r\n84,121,-1\r\n86,44,-2\r\n86,45,-1\r\n86,46,-2\r\n86,58,-1\r\n86,65,-1\r\n86,97,-1\r\n86,101,-1\r\n86,111,-1\r\n86,114,-1\r\n86,117,-1\r\n86,121,-1\r\n87,44,-1\r\n87,46,-1\r\n87,65,-1\r\n87,97,-1\r\n89,44,-2\r\n89,45,-2\r\n89,46,-2\r\n89,58,-1\r\n89,65,-1\r\n89,97,-1\r\n89,101,-2\r\n89,105,-1\r\n89,111,-2\r\n89,112,-1\r\n89,113,-2\r\n89,117,-1\r\n89,118,-1\r\n114,44,-1\r\n114,46,-1\r\n118,44,-1\r\n118,46,-1\r\n119,44,-1\r\n119,46,-1\r\n121,44,-1\r\n121,46,-1\r\n";
		else if( path=="arial_30.txt" ) return "id,x,y,width,height,xoffset,yoffset,xadvance,page,chnl\r\n32,78,22,1,1,0,23,7,0,15\r\n33,252,19,2,18,3,5,8,0,15\r\n34,59,81,7,6,1,5,9,0,15\r\n35,162,19,14,18,0,5,14,0,15\r\n36,78,0,11,21,1,4,14,0,15\r\n37,134,0,19,18,1,5,22,0,15\r\n38,68,24,15,18,1,5,17,0,15\r\n39,70,77,2,6,1,5,5,0,15\r\n40,49,0,6,23,2,5,8,0,15\r\n41,42,0,6,23,0,5,8,0,15\r\n42,50,81,8,8,1,5,10,0,15\r\n43,241,57,12,12,1,8,15,0,15\r\n44,67,77,2,6,2,21,7,0,15\r\n45,108,74,6,2,1,16,8,0,15\r\n46,115,74,2,2,2,21,7,0,15\r\n47,44,62,7,18,0,5,7,0,15\r\n48,54,43,12,18,1,5,14,0,15\r\n49,28,62,7,18,2,5,14,0,15\r\n50,67,43,12,18,1,5,14,0,15\r\n51,80,43,12,18,1,5,14,0,15\r\n52,93,41,12,18,1,5,14,0,15\r\n53,106,40,12,18,1,5,14,0,15\r\n54,28,43,12,18,1,5,14,0,15\r\n55,119,38,12,18,1,5,14,0,15\r\n56,145,38,12,18,1,5,14,0,15\r\n57,158,38,12,18,1,5,14,0,15\r\n58,238,57,2,13,2,10,7,0,15\r\n59,61,62,2,17,2,10,7,0,15\r\n60,13,81,12,11,1,9,15,0,15\r\n61,37,81,12,8,1,10,15,0,15\r\n62,0,81,12,11,1,9,15,0,15\r\n63,15,43,12,18,1,5,14,0,15\r\n64,0,0,23,23,1,5,25,0,15\r\n65,208,0,17,18,0,5,17,0,15\r\n66,207,19,14,18,2,5,17,0,15\r\n67,34,24,1"+
"6,18,1,5,18,0,15\r\n68,116,19,15,18,2,5,18,0,15\r\n69,0,43,14,18,2,5,17,0,15\r\n70,41,43,12,18,2,5,15,0,15\r\n71,51,24,16,18,1,5,19,0,15\r\n72,132,19,14,18,2,5,18,0,15\r\n73,52,62,2,18,2,5,6,0,15\r\n74,243,38,10,18,1,5,13,0,15\r\n75,100,21,15,18,2,5,17,0,15\r\n76,231,38,11,18,2,5,14,0,15\r\n77,154,0,17,18,2,5,21,0,15\r\n78,222,19,14,18,2,5,18,0,15\r\n79,190,0,17,18,1,5,19,0,15\r\n80,177,19,14,18,2,5,17,0,15\r\n81,90,0,17,20,1,5,19,0,15\r\n82,17,24,16,18,2,5,18,0,15\r\n83,84,22,15,18,1,5,17,0,15\r\n84,192,19,14,18,0,5,14,0,15\r\n85,237,19,14,18,2,5,18,0,15\r\n86,226,0,17,18,0,5,17,0,15\r\n87,108,0,25,18,0,5,26,0,15\r\n88,172,0,17,18,0,5,17,0,15\r\n89,0,24,16,18,0,5,16,0,15\r\n90,147,19,14,18,0,5,15,0,15\r\n91,63,0,5,23,2,5,7,0,15\r\n92,20,62,7,18,0,5,7,0,15\r\n93,69,0,5,23,0,5,7,0,15\r\n94,26,81,10,10,1,5,12,0,15\r\n95,92,76,15,2,-1,26,14,0,15\r\n96,87,76,4,3,1,5,8,0,15\r\n97,134,57,12,13,1,10,14,0,15\r\n98,244,0,11,18,2,5,14,0,15\r\n99,185,57,11,13,1,10,13,0,15\r\n100,171,38,11,18,1,5,14,0,15\r\n101,147,57,12,13,1,10,14,0,15\r\n102,11,62,8,18,0,5,7,0,15\r\n103,183,38,11,18,1,10,1"+
"4,0,15\r\n104,0,62,10,18,2,5,14,0,15\r\n105,55,62,2,18,2,5,6,0,15\r\n106,56,0,6,23,-2,5,6,0,15\r\n107,195,38,11,18,2,5,13,0,15\r\n108,58,62,2,18,2,5,6,0,15\r\n109,101,60,18,13,2,10,22,0,15\r\n110,209,57,10,13,2,10,14,0,15\r\n111,64,62,14,14,0,10,14,0,15\r\n112,207,38,11,18,2,10,14,0,15\r\n113,219,38,11,18,1,10,14,0,15\r\n114,231,57,6,13,2,10,8,0,15\r\n115,173,57,11,13,1,10,13,0,15\r\n116,36,62,7,18,0,5,7,0,15\r\n117,220,57,10,13,2,10,14,0,15\r\n118,120,57,13,13,-1,10,11,0,15\r\n119,79,62,21,13,-1,10,19,0,15\r\n120,160,57,12,13,0,10,11,0,15\r\n121,132,38,12,18,1,10,12,0,15\r\n122,197,57,11,13,0,10,12,0,15\r\n123,24,0,8,23,1,5,8,0,15\r\n124,75,0,2,23,2,5,6,0,15\r\n125,33,0,8,23,-1,5,8,0,15\r\n126,73,77,13,4,1,12,15,0,15\r\n\r\nfirst,second,amount\r\n32,65,-1\r\n49,49,-2\r\n65,32,-1\r\n65,84,-2\r\n65,86,-2\r\n65,87,-1\r\n65,89,-2\r\n70,44,-3\r\n70,46,-3\r\n70,65,-1\r\n76,32,-1\r\n76,84,-2\r\n76,86,-2\r\n76,87,-2\r\n76,89,-2\r\n76,121,-1\r\n80,44,-3\r\n80,46,-3\r\n80,65,-2\r\n84,44,-3\r\n84,45,-1\r\n84,46,-3\r\n84,58,-3\r\n84,65,-2\r\n84,97,-3\r\n84,99,-3\r\n84,101,-3\r\n84,105,-1\r\n84,111,-3\r\n84,114,-1\r\n84,115,-3\r\n84"+
",117,-1\r\n84,119,-1\r\n84,121,-1\r\n86,44,-2\r\n86,45,-1\r\n86,46,-2\r\n86,58,-1\r\n86,65,-2\r\n86,97,-2\r\n86,101,-1\r\n86,111,-1\r\n86,114,-1\r\n86,117,-1\r\n86,121,-1\r\n87,44,-1\r\n87,46,-1\r\n87,65,-1\r\n87,97,-1\r\n89,44,-3\r\n89,45,-2\r\n89,46,-3\r\n89,58,-1\r\n89,65,-2\r\n89,97,-2\r\n89,101,-2\r\n89,105,-1\r\n89,111,-2\r\n89,112,-2\r\n89,113,-2\r\n89,117,-1\r\n89,118,-1\r\n114,44,-1\r\n114,46,-1\r\n118,44,-2\r\n118,46,-2\r\n119,44,-1\r\n119,46,-1\r\n121,44,-2\r\n121,46,-2\r\n";
		else if( path=="Tile1.xml" ) return "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n<!-- Created with TexturePacker http://texturepacker.com-->\n<!-- $TexturePacker:SmartUpdate:919644460fd7edd4900d14203b308e34$ -->\n<!--Format:\nn  => name of the sprite\nx  => sprite x pos in texture\ny  => sprite y pos in texture\nw  => sprite width (may be trimmed)\nh  => sprite height (may be trimmed)\noX => sprite's x-corner offset (only available if trimmed)\noY => sprite's y-corner offset (only available if trimmed)\noW => sprite's original width (only available if trimmed)\noH => sprite's original height (only available if trimmed)\nr => 'y' only set if sprite is rotated\n-->\n<TextureAtlas imagePath=\"Tile1.png\" width=\"4000\" height=\"200\">\n    <sprite n=\"tile100\" x=\"0\" y=\"0\" w=\"200\" h=\"200\"/>\n    <sprite n=\"tile101\" x=\"200\" y=\"0\" w=\"200\" h=\"200\"/>\n    <sprite n=\"tile102\" x=\"400\" y=\"0\" w=\"200\" h=\"200\"/>\n    <sprite n=\"tile103\" x=\"600\" y=\"0\" w=\"200\" h=\"200\"/>\n    <sprite n=\"tile104\" x=\"800\" y=\"0\" w=\"200\" h=\"200\"/>\n    <sprite n=\"tile105\" x=\"1000\" y=\"0\" w=\"200\" h=\"200\"/>\n    <spri"+
"te n=\"tile106\" x=\"1200\" y=\"0\" w=\"200\" h=\"200\"/>\n    <sprite n=\"tile107\" x=\"1400\" y=\"0\" w=\"200\" h=\"200\"/>\n    <sprite n=\"tile108\" x=\"1600\" y=\"0\" w=\"200\" h=\"200\"/>\n    <sprite n=\"tile109\" x=\"1800\" y=\"0\" w=\"200\" h=\"200\"/>\n    <sprite n=\"tile110\" x=\"2000\" y=\"0\" w=\"200\" h=\"200\"/>\n    <sprite n=\"tile111\" x=\"2200\" y=\"0\" w=\"200\" h=\"200\"/>\n    <sprite n=\"tile112\" x=\"2400\" y=\"0\" w=\"200\" h=\"200\"/>\n    <sprite n=\"tile113\" x=\"2600\" y=\"0\" w=\"200\" h=\"200\"/>\n    <sprite n=\"tile114\" x=\"2800\" y=\"0\" w=\"200\" h=\"200\"/>\n    <sprite n=\"tile115\" x=\"3000\" y=\"0\" w=\"200\" h=\"200\"/>\n    <sprite n=\"tile116\" x=\"3200\" y=\"0\" w=\"200\" h=\"200\"/>\n    <sprite n=\"tile117\" x=\"3400\" y=\"0\" w=\"200\" h=\"200\"/>\n    <sprite n=\"tile118\" x=\"3600\" y=\"0\" w=\"200\" h=\"200\"/>\n    <sprite n=\"tile119\" x=\"3800\" y=\"0\" w=\"200\" h=\"200\"/>\n</TextureAtlas>\n";
		return "";

//${TEXTFILES_END}
}

function loadImage( path,onloadfun ){
	var ty=getMetaData( path,"type" );
	if( ty.indexOf( "image/" )!=0 ) return null;

	var image=new Image();
	
	image.meta_width=parseInt( getMetaData( path,"width" ) );
	image.meta_height=parseInt( getMetaData( path,"height" ) );
	image.onload=onloadfun;
	image.src="data/"+path;
	
	return image;
}

function loadAudio( path ){
	var audio=new Audio( "data/"+path );
	return audio;
}

//${TRANSCODE_BEGIN}

// Javascript Monkey runtime.
//
// Placed into the public domain 24/02/2011.
// No warranty implied; use at your own risk.

//***** JavaScript Runtime *****

var D2R=0.017453292519943295;
var R2D=57.29577951308232;

var err_info="";
var err_stack=[];

function push_err(){
	err_stack.push( err_info );
}

function pop_err(){
	err_info=err_stack.pop();
}

function stackTrace(){
	var str="";
	push_err();
	err_stack.reverse();
	for( var i=0;i<err_stack.length;++i ){
		str+=err_stack[i]+"\n";
	}
	err_stack.reverse();
	pop_err();
	return str;
}

function print( str ){
	if( game_console ){
		game_console.value+=str+"\n";
	}
	if( window.console!=undefined ){
		window.console.log( str );
	}
}

function showError( err ){
	if( err.length ) alert( "Monkey runtime error: "+err+"\n"+stackTrace() );
}

function error( err ){
	throw err;
}

function dbg_object( obj ){
	if( obj ) return obj;
	error( "Null object access" );
}

function dbg_array( arr,index ){
	if( index>=0 && index<arr.length ) return arr;
	error( "Array index out of range" );
}

function new_bool_array( len ){
	var arr=Array( len );
	for( var i=0;i<len;++i ) arr[i]=false;
	return arr;
}

function new_number_array( len ){
	var arr=Array( len );
	for( var i=0;i<len;++i ) arr[i]=0;
	return arr;
}

function new_string_array( len ){
	var arr=Array( len );
	for( var i=0;i<len;++i ) arr[i]='';
	return arr;
}

function new_array_array( len ){
	var arr=Array( len );
	for( var i=0;i<len;++i ) arr[i]=[];
	return arr;
}

function new_object_array( len ){
	var arr=Array( len );
	for( var i=0;i<len;++i ) arr[i]=null;
	return arr;
}

function resize_bool_array( arr,len ){
	var i=arr.length;
	arr=arr.slice(0,len);
	if( len<=i ) return arr;
	arr.length=len;
	while( i<len ) arr[i++]=false;
	return arr;
}

function resize_number_array( arr,len ){
	var i=arr.length;
	arr=arr.slice(0,len);
	if( len<=i ) return arr;
	arr.length=len;
	while( i<len ) arr[i++]=0;
	return arr;
}

function resize_string_array( arr,len ){
	var i=arr.length;
	arr=arr.slice(0,len);
	if( len<=i ) return arr;
	arr.length=len;
	while( i<len ) arr[i++]="";
	return arr;
}

function resize_array_array( arr,len ){
	var i=arr.length;
	arr=arr.slice(0,len);
	if( len<=i ) return arr;
	arr.length=len;
	while( i<len ) arr[i++]=[];
	return arr;
}

function resize_object_array( arr,len ){
	var i=arr.length;
	arr=arr.slice(0,len);
	if( len<=i ) return arr;
	arr.length=len;
	while( i<len ) arr[i++]=null;
	return arr;
}

function string_compare( lhs,rhs ){
	var n=Math.min( lhs.length,rhs.length ),i,t;
	for( i=0;i<n;++i ){
		t=lhs.charCodeAt(i)-rhs.charCodeAt(i);
		if( t ) return t;
	}
	return lhs.length-rhs.length;
}

function string_replace( str,find,rep ){	//no unregex replace all?!?
	var i=0;
	for(;;){
		i=str.indexOf( find,i );
		if( i==-1 ) return str;
		str=str.substring( 0,i )+rep+str.substring( i+find.length );
		i+=rep.length;
	}
}

function string_trim( str ){
	var i=0,i2=str.length;
	while( i<i2 && str.charCodeAt(i)<=32 ) i+=1;
	while( i2>i && str.charCodeAt(i2-1)<=32 ) i2-=1;
	return str.slice( i,i2 );
}

function string_starts_with( str,substr ){
	return substr.length<=str.length && str.slice(0,substr.length)==substr;
}

function string_ends_with( str,substr ){
	return substr.length<=str.length && str.slice(str.length-substr.length,str.length)==substr;
}

function object_downcast( obj,clas ){
	if( obj instanceof clas ) return obj;
	return null;
}

function object_implements( obj,iface ){
	if( obj && obj.implments && obj.implments[iface] ) return obj;
	return null;
}

function extend_class( clas ){
	var tmp=function(){};
	tmp.prototype=clas.prototype;
	return new tmp;
}

// HTML5 mojo runtime.
//
// Copyright 2011 Mark Sibly, all rights reserved.
// No warranty implied; use at your own risk.

var dead=false;

var KEY_LMB=1;
var KEY_RMB=2;
var KEY_MMB=3;
var KEY_TOUCH0=0x180;

function eatEvent( e ){
	if( e.stopPropagation ){
		e.stopPropagation();
		e.preventDefault();
	}else{
		e.cancelBubble=true;
		e.returnValue=false;
	}
}

function keyToChar( key ){
	switch( key ){
	case 8:
	case 9:
	case 13:
	case 27:
	case 32:
		return key;
	case 33:
	case 34:
	case 35:
	case 36:
	case 37:
	case 38:
	case 39:
	case 40:
	case 45:
		return key | 0x10000;
	case 46:
		return 127;
	}
	return 0;
}

//***** gxtkApp class *****

function gxtkApp(){

	this.graphics=new gxtkGraphics( this,game_canvas );
	this.input=new gxtkInput( this );
	this.audio=new gxtkAudio( this );

	this.loading=0;
	this.maxloading=0;

	this.updateRate=0;
	
	this.startMillis=(new Date).getTime();
	
	this.suspended=false;
	
	var app=this;
	var canvas=game_canvas;
	
	function gxtkMain(){
		canvas.onkeydown=function( e ){
			app.input.OnKeyDown( e.keyCode );
			var chr=keyToChar( e.keyCode );
			if( chr ) app.input.PutChar( chr );
			if( e.keyCode<48 || (e.keyCode>111 && e.keyCode<122) ) eatEvent( e );
		}

		canvas.onkeyup=function( e ){
			app.input.OnKeyUp( e.keyCode );
		}

		canvas.onkeypress=function( e ){
			if( e.charCode ){
				app.input.PutChar( e.charCode );
			}else if( e.which ){
				app.input.PutChar( e.which );
			}
		}

		canvas.onmousedown=function( e ){
			switch( e.button ){
			case 0:app.input.OnKeyDown( KEY_LMB );break;
			case 1:app.input.OnKeyDown( KEY_MMB );break;
			case 2:app.input.OnKeyDown( KEY_RMB );break;
			}
			eatEvent( e );
		}
		
		canvas.onmouseup=function( e ){
			switch( e.button ){
			case 0:app.input.OnKeyUp( KEY_LMB );break;
			case 1:app.input.OnKeyUp( KEY_MMB );break;
			case 2:app.input.OnKeyUp( KEY_RMB );break;
			}
			eatEvent( e );
		}
		
		canvas.onmouseout=function( e ){
			app.input.OnKeyUp( KEY_LMB );
			app.input.OnKeyUp( KEY_MMB );
			app.input.OnKeyUp( KEY_RMB );
			eatEvent( e );
		}

		canvas.onmousemove=function( e ){
			var x=e.clientX+document.body.scrollLeft;
			var y=e.clientY+document.body.scrollTop;
			var c=canvas;
			while( c ){
				x-=c.offsetLeft;
				y-=c.offsetTop;
				c=c.offsetParent;
			}
			app.input.OnMouseMove( x,y );
			eatEvent( e );
		}

		canvas.onfocus=function( e ){
			//app.InvokeOnResume();
		}
		
		canvas.onblur=function( e ){
			//app.InvokeOnSuspend();
		}

		canvas.focus();

		app.InvokeOnCreate();
		app.InvokeOnRender();
	}
	
	game_runner=gxtkMain;
}

var timerSeq=0;

gxtkApp.prototype.SetFrameRate=function( fps ){

	var seq=++timerSeq;
	
	if( !fps ) return;
	
	var app=this;
	var updatePeriod=1000.0/fps;
	var nextUpdate=(new Date).getTime()+updatePeriod;
	
	function timeElapsed(){
		if( seq!=timerSeq ) return;

		var time;		
		var updates=0;

		for(;;){
			nextUpdate+=updatePeriod;

			app.InvokeOnUpdate();
			if( seq!=timerSeq ) return;
			
			if( nextUpdate>(new Date).getTime() ) break;
			
			if( ++updates==7 ){
				nextUpdate=(new Date).getTime();
				break;
			}
		}
		app.InvokeOnRender();
		if( seq!=timerSeq ) return;
			
		var delay=nextUpdate-(new Date).getTime();
		setTimeout( timeElapsed,delay>0 ? delay : 0 );
	}
	
	setTimeout( timeElapsed,updatePeriod );
}

gxtkApp.prototype.IncLoading=function(){
	++this.loading;
	if( this.loading>this.maxloading ) this.maxloading=this.loading;
	if( this.loading==1 ) this.SetFrameRate( 0 );
}

gxtkApp.prototype.DecLoading=function(){
	--this.loading;
	if( this.loading!=0 ) return;
	this.maxloading=0;
	this.SetFrameRate( this.updateRate );
}

gxtkApp.prototype.GetMetaData=function( path,key ){
	return getMetaData( path,key );
}

gxtkApp.prototype.Die=function( err ){
	dead=true;
	this.audio.OnSuspend();
	showError( err );
}

gxtkApp.prototype.InvokeOnCreate=function(){
	if( dead ) return;
	
	try{
		this.OnCreate();
	}catch( ex ){
		this.Die( ex );
	}
}

gxtkApp.prototype.InvokeOnUpdate=function(){
	if( dead || this.suspended || !this.updateRate || this.loading ) return;
	
	try{
		this.input.BeginUpdate();
		this.OnUpdate();		
		this.input.EndUpdate();
	}catch( ex ){
		this.Die( ex );
	}
}

gxtkApp.prototype.InvokeOnSuspend=function(){
	if( dead || this.suspended ) return;
	
	try{
		this.suspended=true;
		this.OnSuspend();
		this.audio.OnSuspend();
	}catch( ex ){
		this.Die( ex );
	}
}

gxtkApp.prototype.InvokeOnResume=function(){
	if( dead || !this.suspended ) return;
	
	try{
		this.audio.OnResume();
		this.OnResume();
		this.suspended=false;
	}catch( ex ){
		this.Die( ex );
	}
}

gxtkApp.prototype.InvokeOnRender=function(){
	if( dead || this.suspended ) return;
	
	try{
		this.graphics.BeginRender();
		if( this.loading ){
			this.OnLoading();
		}else{
			this.OnRender();
		}
		this.graphics.EndRender();
	}catch( ex ){
		this.Die( ex );
	}
}

//***** GXTK API *****

gxtkApp.prototype.GraphicsDevice=function(){
	return this.graphics;
}

gxtkApp.prototype.InputDevice=function(){
	return this.input;
}

gxtkApp.prototype.AudioDevice=function(){
	return this.audio;
}

gxtkApp.prototype.AppTitle=function(){
	return document.URL;
}

gxtkApp.prototype.LoadState=function(){
	//use cookies for file:// URLS in FF and IE...
	if( document.URL.toLowerCase().substr(0,7)=="file://" &&
			(navigator.userAgent.indexOf( "Firefox" )!=-1 || navigator.userAgent.indexOf( "MSIE" )!=-1) ){
		var bits=document.cookie.split( ";" )
		if( bits.length!=1 ) return "";
		bits=bits[0].split( "=" );
		if( bits.length!=2 || bits[0]!=".mojostate" ) return "";
		return unescape( bits[1] );
	}else{
		var state=localStorage.getItem( ".mojostate@"+document.URL );
		if( state ) return state;
	}
	return "";
}

gxtkApp.prototype.SaveState=function( state ){
	//use cookies for file:// URLS in FF and IE...
	if( document.URL.toLowerCase().substr(0,7)=="file://" &&
			(navigator.userAgent.indexOf( "Firefox" )!=-1 || navigator.userAgent.indexOf( "MSIE" )!=-1) ){
		var exdate=new Date();
		exdate.setDate( exdate.getDate()+3650 );
		document.cookie=".mojostate="+escape( state )+"; expires="+exdate.toUTCString()
	}else{
		localStorage.setItem( ".mojostate@"+document.URL,state );
	}
}

gxtkApp.prototype.LoadString=function( path ){
	return loadString( path );
}

gxtkApp.prototype.SetUpdateRate=function( fps ){
	this.updateRate=fps;
	
	if( !this.loading ) this.SetFrameRate( fps );
}

gxtkApp.prototype.MilliSecs=function(){
	return ((new Date).getTime()-this.startMillis)|0;
}

gxtkApp.prototype.Loading=function(){
	return this.loading;
}

gxtkApp.prototype.OnCreate=function(){
}

gxtkApp.prototype.OnUpdate=function(){
}

gxtkApp.prototype.OnSuspend=function(){
}

gxtkApp.prototype.OnResume=function(){
}

gxtkApp.prototype.OnRender=function(){
}

gxtkApp.prototype.OnLoading=function(){
}

//***** gxtkGraphics class *****

function gxtkGraphics( app,canvas ){
	this.app=app;
	this.canvas=canvas;
	this.gc=canvas.getContext( '2d' );
	this.tmpCanvas=null;
	this.r=255;
	this.b=255;
	this.g=255;
	this.white=true;
	this.color="rgb(255,255,255)"
	this.alpha=1.0;
	this.blend="source-over";
	this.ix=1;this.iy=0;
	this.jx=0;this.jy=1;
	this.tx=0;this.ty=0;
	this.tformed=false;
	this.scissorX=0;
	this.scissorY=0;
	this.scissorWidth=0;
	this.scissorHeight=0;
	this.clipped=false;
}

gxtkGraphics.prototype.BeginRender=function(){
	this.gc.save();
}

gxtkGraphics.prototype.EndRender=function(){
	this.gc.restore();
}

gxtkGraphics.prototype.Width=function(){
	return this.canvas.width;
}

gxtkGraphics.prototype.Height=function(){
	return this.canvas.height;
}

gxtkGraphics.prototype.LoadSurface=function( path ){
	
	var app=this.app;
	
	function onloadfun(){
		app.DecLoading();
	}

	app.IncLoading();

	var image=loadImage( path,onloadfun );
	if( image ) return new gxtkSurface( image,this );

	app.DecLoading();
	return null;
}

gxtkGraphics.prototype.SetAlpha=function( alpha ){
	this.alpha=alpha;
	this.gc.globalAlpha=alpha;
}

gxtkGraphics.prototype.SetColor=function( r,g,b ){
	this.r=r;
	this.g=g;
	this.b=b;
	this.white=(r==255 && g==255 && b==255);
	this.color="rgb("+(r|0)+","+(g|0)+","+(b|0)+")";
	this.gc.fillStyle=this.color;
	this.gc.strokeStyle=this.color;
}

gxtkGraphics.prototype.SetBlend=function( blend ){
	switch( blend ){
	case 1:
		this.blend="lighter";
		break;
	default:
		this.blend="source-over";
	}
	this.gc.globalCompositeOperation=this.blend;
}

gxtkGraphics.prototype.SetScissor=function( x,y,w,h ){
	this.scissorX=x;
	this.scissorY=y;
	this.scissorWidth=w;
	this.scissorHeight=h;
	this.clipped=(x!=0 || y!=0 || w!=this.canvas.width || h!=this.canvas.height);
	this.gc.restore();
	this.gc.save();
	if( this.clipped ){
		this.gc.beginPath();
		this.gc.rect( x,y,w,h );
		this.gc.clip();
		this.gc.closePath();
	}
	this.gc.fillStyle=this.color;
	this.gc.strokeStyle=this.color;
	if( this.tformed ) this.gc.setTransform( this.ix,this.iy,this.jx,this.jy,this.tx,this.ty );
}

gxtkGraphics.prototype.SetMatrix=function( ix,iy,jx,jy,tx,ty ){
	this.ix=ix;this.iy=iy;
	this.jx=jx;this.jy=jy;
	this.tx=tx;this.ty=ty;
	this.gc.setTransform( ix,iy,jx,jy,tx,ty );
	this.tformed=(ix!=1 || iy!=0 || jx!=0 || jy!=1 || tx!=0 || ty!=0);
}

gxtkGraphics.prototype.Cls=function( r,g,b ){
	if( this.tformed ) this.gc.setTransform( 1,0,0,1,0,0 );
	this.gc.fillStyle="rgb("+(r|0)+","+(g|0)+","+(b|0)+")";
	this.gc.globalAlpha=1;
	this.gc.globalCompositeOperation="source-over";
	this.gc.fillRect( 0,0,this.canvas.width,this.canvas.height );
	this.gc.fillStyle=this.color;
	this.gc.globalAlpha=this.alpha;
	this.gc.globalCompositeOperation=this.blend;
	if( this.tformed ) this.gc.setTransform( this.ix,this.iy,this.jx,this.jy,this.tx,this.ty );
}

gxtkGraphics.prototype.DrawRect=function( x,y,w,h ){
	if( w<0 ){ x+=w;w=-w; }
	if( h<0 ){ y+=h;h=-h; }
	if( w<=0 || h<=0 ) return;
	//
	this.gc.fillRect( x,y,w,h );
}

gxtkGraphics.prototype.DrawLine=function( x1,y1,x2,y2 ){
	if( this.tformed ){
		var x1_t=x1 * this.ix + y1 * this.jx + this.tx;
		var y1_t=x1 * this.iy + y1 * this.jy + this.ty;
		var x2_t=x2 * this.ix + y2 * this.jx + this.tx;
		var y2_t=x2 * this.iy + y2 * this.jy + this.ty;
		this.gc.setTransform( 1,0,0,1,0,0 );
	  	this.gc.beginPath();
	  	this.gc.moveTo( x1_t,y1_t );
	  	this.gc.lineTo( x2_t,y2_t );
	  	this.gc.stroke();
	  	this.gc.closePath();
		this.gc.setTransform( this.ix,this.iy,this.jx,this.jy,this.tx,this.ty );
	}else{
	  	this.gc.beginPath();
	  	this.gc.moveTo( x1,y1 );
	  	this.gc.lineTo( x2,y2 );
	  	this.gc.stroke();
	  	this.gc.closePath();
	}
}

gxtkGraphics.prototype.DrawOval=function( x,y,w,h ){
	if( w<0 ){ x+=w;w=-w; }
	if( h<0 ){ y+=h;h=-h; }
	if( w<=0 || h<=0 ) return;
	//
  	var w2=w/2,h2=h/2;
	this.gc.save();
	this.gc.translate( x+w2,y+h2 );
	this.gc.scale( w2,h2 );
  	this.gc.beginPath();
	this.gc.arc( 0,0,1,0,Math.PI*2,false );
	this.gc.fill();
  	this.gc.closePath();
	this.gc.restore();
}

gxtkGraphics.prototype.DrawPoly=function( verts ){
	if( verts.length<6 ) return;
	this.gc.beginPath();
	this.gc.moveTo( verts[0],verts[1] );
	for( var i=2;i<verts.length;i+=2 ){
		this.gc.lineTo( verts[i],verts[i+1] );
	}
	this.gc.fill();
	this.gc.closePath();
}

gxtkGraphics.prototype.DrawSurface=function( surface,x,y ){
	if( !surface.image.complete ) return;
	
	if( this.white ){
		this.gc.drawImage( surface.image,x,y );
		return;
	}
	
	this.DrawImageTinted( surface.image,x,y,0,0,surface.swidth,surface.sheight );
}

gxtkGraphics.prototype.DrawSurface2=function( surface,x,y,srcx,srcy,srcw,srch ){
	if( !surface.image.complete ) return;

	if( srcw<0 ){ srcx+=srcw;srcw=-srcw; }
	if( srch<0 ){ srcy+=srch;srch=-srch; }
	if( srcw<=0 || srch<=0 ) return;

	if( this.white ){
		this.gc.drawImage( surface.image,srcx,srcy,srcw,srch,x,y,srcw,srch );
		return;
	}
	
	this.DrawImageTinted( surface.image,x,y,srcx,srcy,srcw,srch  );
}

gxtkGraphics.prototype.DrawImageTinted=function( image,dx,dy,sx,sy,sw,sh ){

	if( !this.tmpCanvas ){
		this.tmpCanvas=document.createElement( "canvas" );
	}

	if( sw>this.tmpCanvas.width || sh>this.tmpCanvas.height ){
		this.tmpCanvas.width=Math.max( sw,this.tmpCanvas.width );
		this.tmpCanvas.height=Math.max( sh,this.tmpCanvas.height );
	}
	
	var tgc=this.tmpCanvas.getContext( "2d" );
	
	tgc.globalCompositeOperation="copy";

	tgc.drawImage( image,sx,sy,sw,sh,0,0,sw,sh );
	
	var imgData=tgc.getImageData( 0,0,sw,sh );
	
	var p=imgData.data,sz=sw*sh*4,i;
	
	for( i=0;i<sz;i+=4 ){
		p[i]=p[i]*this.r/255;
		p[i+1]=p[i+1]*this.g/255;
		p[i+2]=p[i+2]*this.b/255;
	}
	
	tgc.putImageData( imgData,0,0 );
	
	this.gc.drawImage( this.tmpCanvas,0,0,sw,sh,dx,dy,sw,sh );
}

//***** gxtkSurface class *****

function gxtkSurface( image,graphics ){
	this.image=image;
	this.graphics=graphics;
	this.swidth=image.meta_width;
	this.sheight=image.meta_height;
}

//***** GXTK API *****

gxtkSurface.prototype.Discard=function(){
	if( this.image ){
		this.image=null;
	}
}

gxtkSurface.prototype.Width=function(){
	return this.swidth;
}

gxtkSurface.prototype.Height=function(){
	return this.sheight;
}

gxtkSurface.prototype.Loaded=function(){
	return this.image.complete;
}

//***** Class gxtkInput *****

function gxtkInput( app ){
	this.app=app;
	this.keyStates=new Array( 512 );
	this.charQueue=new Array( 32 );
	this.charPut=0;
	this.charGet=0;
	this.mouseX=0;
	this.mouseY=0;
	this.joyX=0;
	this.joyY=0;
	this.joyZ=0;
	this.accelX=0;
	this.accelY=0;
	this.accelZ=0;
	for( var i=0;i<512;++i ){
		this.keyStates[i]=0;
	}
}

gxtkInput.prototype.BeginUpdate=function(){
}

gxtkInput.prototype.EndUpdate=function(){
	for( var i=0;i<512;++i ){
		this.keyStates[i]&=0x100;
	}
	this.charGet=0;
	this.charPut=0;
}

gxtkInput.prototype.OnKeyDown=function( key ){
	if( (this.keyStates[key]&0x100)==0 ){
		this.keyStates[key]|=0x100;
		++this.keyStates[key];	
	}
}

gxtkInput.prototype.OnKeyUp=function( key ){
	this.keyStates[key]&=0xff;
}

gxtkInput.prototype.PutChar=function( char ){
	if( this.charPut-this.charGet<32 ){
		this.charQueue[this.charPut & 31]=char;
		this.charPut+=1;
	}
}

gxtkInput.prototype.OnMouseMove=function( x,y ){
	this.mouseX=x;
	this.mouseY=y;
}

//***** GXTK API *****

gxtkInput.prototype.SetKeyboardEnabled=function( enabled ){
	return 0;
}

gxtkInput.prototype.KeyDown=function( key ){
	if( key>0 && key<512 ){
		if( key==KEY_TOUCH0 ) key=KEY_LMB;
		return this.keyStates[key] >> 8;
	}
	return 0;
}

gxtkInput.prototype.KeyHit=function( key ){
	if( key>0 && key<512 ){
		if( key==KEY_TOUCH0 ) key=KEY_LMB;
		return this.keyStates[key] & 0xff;
	}
	return 0;
}

gxtkInput.prototype.GetChar=function(){
	if( this.charPut!=this.charGet ){
		var char=this.charQueue[this.charGet & 31];
		this.charGet+=1;
		return char;
	}
	return 0;
}

gxtkInput.prototype.MouseX=function(){
	return this.mouseX;
}

gxtkInput.prototype.MouseY=function(){
	return this.mouseY;
}

gxtkInput.prototype.JoyX=function( index ){
	return this.joyX;
}

gxtkInput.prototype.JoyY=function( index ){
	return this.joyY;
}

gxtkInput.prototype.JoyZ=function( index ){
	return this.joyZ;
}

gxtkInput.prototype.TouchX=function( index ){
	return this.mouseX;
}

gxtkInput.prototype.TouchY=function( index ){
	return this.mouseY;
}

gxtkInput.prototype.AccelX=function(){
	return 0;
}

gxtkInput.prototype.AccelY=function(){
	return 0;
}

gxtkInput.prototype.AccelZ=function(){
	return 0;
}


//***** gxtkChannel class *****
function gxtkChannel(){
	this.audio=null;
	this.sample=null;
	this.volume=1;
	this.pan=0;
	this.rate=1;
}

//***** gxtkAudio class *****
function gxtkAudio( app ){
	this.app=app;
	this.okay=typeof(Audio)!="undefined";
	this.nextchan=0;
	this.music=null;
	this.channels=new Array(33);
	for( var i=0;i<33;++i ){
		this.channels[i]=new gxtkChannel();
	}
}

gxtkAudio.prototype.OnSuspend=function(){
	var i;
	for( i=0;i<33;++i ){
		var chan=this.channels[i];
		if( chan.audio ) chan.audio.pause();
	}
}

gxtkAudio.prototype.OnResume=function(){
	var i;
	for( i=0;i<33;++i ){
		var chan=this.channels[i];
		if( chan.audio ) chan.audio.play();
	}
}

gxtkAudio.prototype.LoadSample=function( path ){
	var audio=loadAudio( path );
	if( audio ) return new gxtkSample( audio );
	return null;
}

gxtkAudio.prototype.PlaySample=function( sample,channel,flags ){
	if( !this.okay ) return;
	
	var chan=this.channels[channel];
	
	if( chan.sample==sample && chan.audio ){	//&& !chan.audio.paused ){
		chan.audio.loop=(flags&1)!=0;
		chan.audio.volume=chan.volume;
		try{
			chan.audio.currentTime=0;
		}catch(ex){
		}
		chan.audio.play();
		return;
	}

	if( chan.audio ) chan.audio.pause();
	
	var audio=sample.AllocAudio();
	
	if( audio ){
		for( var i=0;i<33;++i ){
			if( this.channels[i].audio==audio ){
				this.channels[i].audio=null;
				break;
			}
		}
		audio.loop=(flags&1)!=0;
		audio.volume=chan.volume;
		audio.play();
	}
	
	chan.audio=audio;
	chan.sample=sample;
}

gxtkAudio.prototype.StopChannel=function( channel ){
	var chan=this.channels[channel];
	if( chan.audio ) chan.audio.pause();
}

gxtkAudio.prototype.ChannelState=function( channel ){
	var chan=this.channels[channel];
	if( chan.audio && !chan.audio.paused && !chan.audio.ended ) return 1;
	return 0;
}

gxtkAudio.prototype.SetVolume=function( channel,volume ){
	var chan=this.channels[channel];
	if( chan.audio ) chan.audio.volume=volume;
	chan.volume=volume;
}

gxtkAudio.prototype.SetPan=function( channel,pan ){
	var chan=this.channels[channel];
	chan.pan=pan;
}

gxtkAudio.prototype.SetRate=function( channel,rate ){
	var chan=this.channels[channel];
	chan.rate=rate;
}

gxtkAudio.prototype.PlayMusic=function( path,flags ){
	this.StopMusic();
	
	this.music=this.LoadSample( path );
	if( !this.music ) return;
	
	this.PlaySample( this.music,32,flags );
}

gxtkAudio.prototype.StopMusic=function(){
	this.StopChannel( 32 );

	if( this.music ){
		this.music.Discard();
		this.music=null;
	}
}

gxtkAudio.prototype.MusicState=function(){

	return this.ChannelState( 32 );
}

gxtkAudio.prototype.SetMusicVolume=function( volume ){

	this.SetVolume( 32,volume );
}

//***** gxtkSample class *****

function gxtkSample( audio ){
	this.audio=audio;
	this.insts=new Array( 8 );
	this.insts[0]=audio;
}

gxtkSample.prototype.Discard=function(){
	if( this.audio ){
		this.audio=null;
		for( var i=0;i<8;++i ){
			this.insts[i]=null;
		}
	}
}

gxtkSample.prototype.AllocAudio=function(){
	for( var i=0;i<8;++i ){
		var audio=this.insts[i];
		if( audio ){
			//Ok, this is ugly but seems to work best...no idea how/why!
			if( audio.paused ){
				if( audio.currentTime==0 ) return audio;
				audio.currentTime=0;
			}else if( audio.ended ){
				audio.pause();
			}
		}else{
			audio=new Audio( this.audio.src );
			this.insts[i]=audio;
			return audio;
		}
	}
	return null;
}
function bb_app_App(){
	Object.call(this);
}
function bb_app_new(){
	bb_app_device=bb_app_new2.call(new bb_app_AppDevice,this);
	return this;
}
bb_app_App.prototype.bbm_OnCreate=function(){
	return 0;
}
bb_app_App.prototype.bbm_OnUpdate=function(){
	return 0;
}
bb_app_App.prototype.bbm_OnSuspend=function(){
	return 0;
}
bb_app_App.prototype.bbm_OnResume=function(){
	return 0;
}
bb_app_App.prototype.bbm_OnRender=function(){
	return 0;
}
bb_app_App.prototype.bbm_OnLoading=function(){
	return 0;
}
function bb_gb_GameApp(){
	bb_app_App.call(this);
	this.bb_font=null;
	this.bb_fontBig=null;
	this.bb_grid=null;
	this.bb_logo=null;
	this.bb_story=null;
	this.bb_arrange=null;
	this.bb_nextImg=null;
	this.bb_play=null;
	this.bb_load=null;
	this.bb_restart=null;
	this.bb_clickTheBall=null;
	this.bb_scoreImage=null;
	this.bb_gameOver=null;
	this.bb_nextButton=null;
	this.bb_gameState="TitleScreen";
	this.bb_timer=true;
	this.bb_x=0;
	this.bb_y=0;
	this.bb_tileSelected=0;
	this.bb_t1=-1;
	this.bb_t2=-1;
	this.bb_debugb=false;
}
bb_gb_GameApp.prototype=extend_class(bb_app_App);
function bb_gb_new(){
	bb_app_new.call(this);
	return this;
}
bb_gb_GameApp.prototype.bbm_OnCreate=function(){
	this.bb_font=bb_angelfont_new2.call(new bb_angelfont_AngelFont);
	this.bb_font.bbm_LoadFont("arial");
	this.bb_fontBig=bb_angelfont_new2.call(new bb_angelfont_AngelFont);
	this.bb_fontBig.bbm_LoadFont("arial_30");
	this.bb_grid=bb_grid_new.call(new bb_grid_Grid);
	this.bb_grid.bb_font=this.bb_font;
	this.bb_logo=bb_graphics_LoadImage("goldbergboros.png",1,bb_graphics_DefaultFlags);
	this.bb_story=bb_graphics_LoadImage("thestoryofaball.png",1,bb_graphics_DefaultFlags);
	this.bb_arrange=bb_graphics_LoadImage("arrangethetiles.png",1,bb_graphics_DefaultFlags);
	this.bb_nextImg=bb_graphics_LoadImage("btn-next.png",1,bb_graphics_DefaultFlags);
	this.bb_play=bb_graphics_LoadImage("btn_play.png",1,bb_graphics_DefaultFlags);
	this.bb_load=bb_graphics_LoadImage("btn-loading.png",1,bb_graphics_DefaultFlags);
	this.bb_restart=bb_graphics_LoadImage("btn_restart.png",1,bb_graphics_DefaultFlags);
	this.bb_clickTheBall=bb_graphics_LoadImage("clicktheball.png",1,bb_graphics_DefaultFlags);
	this.bb_scoreImage=bb_graphics_LoadImage("score.png",1,bb_graphics_DefaultFlags);
	this.bb_gameOver=bb_graphics_LoadImage("game_over.png",1,bb_graphics_DefaultFlags);
	this.bb_nextButton=bb_buttons_new.call(new bb_buttons_Button);
	this.bb_nextButton.bbm_setCoords(((bb_graphics_DeviceWidth()/2)|0)-((this.bb_nextImg.bbm_Width()/2)|0),((bb_graphics_DeviceHeight()/2)|0)-((this.bb_nextImg.bbm_Height()/2)|0));
	bb_app_SetUpdateRate(50);
	return 0;
}
bb_gb_GameApp.prototype.bbm_EndGame=function(){
	this.bb_gameState="GameOver";
	return 0;
}
bb_gb_GameApp.prototype.bbm_SetUpGame=function(){
	this.bb_grid.bbm_fillGrid();
	this.bb_grid.bb_goneInfinite=false;
	this.bb_gameState="SetUp";
	return 0;
}
bb_gb_GameApp.prototype.bbm_tileSelect=function(bbt_xpos,bbt_ypos){
	this.bb_x=bbt_xpos % 200;
	bbt_xpos=bbt_xpos-this.bb_x;
	bbt_xpos=bbt_xpos % 199;
	bbt_xpos=bbt_xpos+1;
	this.bb_y=bbt_ypos % 200;
	bbt_ypos=bbt_ypos-this.bb_y;
	bbt_ypos=bbt_ypos % 199;
	bbt_ypos=bbt_ypos+1;
	this.bb_tileSelected=bbt_xpos+(bbt_ypos-1)*4-1;
	if(this.bb_t1==-1){
		this.bb_t1=this.bb_tileSelected;
		this.bb_grid.bbm_selectTile(this.bb_t1);
	}else{
		if(this.bb_t1==this.bb_tileSelected){
			this.bb_grid.bbm_deselectTile(this.bb_t1);
			var bbt_t=this.bb_grid.bb_myGrid[this.bb_t1];
			this.bb_t1=-1;
		}else{
			if(this.bb_t2==-1){
				this.bb_t2=this.bb_tileSelected;
			}
		}
	}
	return 0;
}
bb_gb_GameApp.prototype.bbm_resetTilesSelected=function(){
	this.bb_t1=-1;
	this.bb_t2=-1;
	return 0;
}
bb_gb_GameApp.prototype.bbm_PlayGame=function(){
	this.bb_grid.bb_currentTile=this.bb_grid.bb_myGrid[0];
	this.bb_grid.bb_activeTile=0;
	this.bb_grid.bb_currentEnt=1;
	this.bb_grid.bb_currentExit=0;
	this.bb_grid.bb_totalScore=0;
	this.bb_gameState="Playing";
	return 0;
}
bb_gb_GameApp.prototype.bbm_OnUpdate=function(){
	if(this.bb_gameState=="Playing"){
		if(!this.bb_grid.bbm_Update() || ((bb_input_KeyDown(27))!=0)){
			this.bbm_EndGame();
		}
	}else{
		if(this.bb_gameState=="TitleScreen"){
			if((bb_input_MouseDown(0))!=0){
				if(this.bb_timer){
					this.bb_timer=false;
					if(this.bb_nextButton.bbm_inside(((bb_input_MouseX())|0),((bb_input_MouseY())|0))){
						this.bb_gameState="story";
					}
				}
			}
			if(!((bb_input_MouseDown(0))!=0)){
				this.bb_timer=true;
			}
		}else{
			if(this.bb_gameState=="story"){
				if((bb_input_MouseDown(0))!=0){
					if(this.bb_timer){
						this.bb_timer=false;
						if(this.bb_nextButton.bbm_inside(((bb_input_MouseX())|0),((bb_input_MouseY())|0))){
							this.bb_gameState="arrange";
						}
					}
				}
				if(!((bb_input_MouseDown(0))!=0)){
					this.bb_timer=true;
				}
			}else{
				if(this.bb_gameState=="arrange"){
					if((bb_input_MouseDown(0))!=0){
						if(this.bb_timer){
							this.bb_timer=false;
							if(this.bb_nextButton.bbm_inside(((bb_input_MouseX())|0),((bb_input_MouseY())|0))){
								this.bb_gameState="loading";
							}
						}
					}
					if(!((bb_input_MouseDown(0))!=0)){
						this.bb_timer=true;
					}
				}else{
					if(this.bb_gameState=="loading"){
						this.bbm_SetUpGame();
					}else{
						if(this.bb_gameState=="GameOver"){
							if((bb_input_MouseDown(0))!=0){
								if(this.bb_timer){
									this.bb_timer=false;
									if(this.bb_nextButton.bbm_inside(((bb_input_MouseX())|0),((bb_input_MouseY())|0))){
										this.bb_gameState="loading";
									}
								}
							}
							if(!((bb_input_MouseDown(0))!=0)){
								this.bb_timer=true;
							}
						}else{
							if(this.bb_gameState=="SetUp"){
								this.bb_grid.bb_totalScore=0;
								if(((bb_input_MouseDown(0))!=0) && bb_input_MouseX()>(this.bb_grid.bb_marginLeft) && bb_input_MouseX()<(this.bb_grid.bb_marginLeft+800) && bb_input_MouseY()>(this.bb_grid.bb_marginTop) && bb_input_MouseY()<(this.bb_grid.bb_marginTop+800)){
									if(this.bb_timer){
										this.bb_timer=false;
										this.bbm_tileSelect(((bb_input_MouseX()-(this.bb_grid.bb_marginLeft))|0),((bb_input_MouseY()-(this.bb_grid.bb_marginTop))|0));
										if(this.bb_t1>-1 && this.bb_t2>-1){
											this.bb_grid.bbm_swapTiles(this.bb_t1,this.bb_t2);
											this.bbm_resetTilesSelected();
										}
									}
								}else{
									if(((bb_input_MouseDown(0))!=0) && bb_input_MouseX()<(this.bb_grid.bb_marginLeft) && bb_input_MouseY()<150.0){
										this.bbm_PlayGame();
									}
								}
								if(!((bb_input_MouseDown(0))!=0)){
									this.bb_timer=true;
								}
								if((bb_input_KeyDown(13))!=0){
									this.bbm_PlayGame();
								}
							}
						}
					}
				}
			}
		}
	}
	return 0;
}
bb_gb_GameApp.prototype.bbm_OnRender=function(){
	bb_graphics_Cls(255.0,255.0,255.0);
	if(this.bb_gameState=="SetUp"){
		bb_graphics_DrawImage(this.bb_clickTheBall,0.0,50.0,0);
	}
	if(this.bb_gameState=="Playing" || this.bb_gameState=="SetUp"){
		bb_graphics_DrawImage(this.bb_scoreImage,1050.0,80.0,0);
		this.bb_font.bbm_DrawHTML("You have <b>"+String(this.bb_grid.bb_totalScore)+"</b> points",1050,200);
		this.bb_grid.bbm_Render();
	}else{
		if(this.bb_gameState=="TitleScreen"){
			bb_graphics_DrawImage(this.bb_logo,(((bb_graphics_DeviceWidth()/2)|0)-((this.bb_logo.bbm_Width()/2)|0)),(((bb_graphics_DeviceHeight()/2)|0)-((this.bb_logo.bbm_Height()/2)|0)-150),0);
			bb_graphics_DrawImage(this.bb_nextImg,(((bb_graphics_DeviceWidth()/2)|0)-((this.bb_nextImg.bbm_Width()/2)|0)),(((bb_graphics_DeviceHeight()/2)|0)-((this.bb_nextImg.bbm_Height()/2)|0)),0);
			var bbt_debugX=((bb_graphics_DeviceWidth()/2)|0)-((this.bb_nextImg.bbm_Width()/2)|0);
			var bbt_debugY=((bb_graphics_DeviceHeight()/2)|0)-((this.bb_nextImg.bbm_Height()/2)|0);
			if(this.bb_debugb){
				print(" buttonX is "+String(bbt_debugX));
				print(" buttonY is "+String(bbt_debugY));
				this.bb_debugb=false;
			}
		}else{
			if(this.bb_gameState=="story"){
				bb_graphics_DrawImage(this.bb_story,(((bb_graphics_DeviceWidth()/2)|0)-((this.bb_story.bbm_Width()/2)|0)),(((bb_graphics_DeviceHeight()/2)|0)-((this.bb_story.bbm_Height()/2)|0)-150),0);
				bb_graphics_DrawImage(this.bb_nextImg,(((bb_graphics_DeviceWidth()/2)|0)-((this.bb_nextImg.bbm_Width()/2)|0)),(((bb_graphics_DeviceHeight()/2)|0)-((this.bb_nextImg.bbm_Height()/2)|0)),0);
			}else{
				if(this.bb_gameState=="arrange"){
					bb_graphics_DrawImage(this.bb_arrange,(((bb_graphics_DeviceWidth()/2)|0)-((this.bb_arrange.bbm_Width()/2)|0)),(((bb_graphics_DeviceHeight()/2)|0)-((this.bb_arrange.bbm_Height()/2)|0)-150),0);
					bb_graphics_DrawImage(this.bb_play,(((bb_graphics_DeviceWidth()/2)|0)-((this.bb_nextImg.bbm_Width()/2)|0)),(((bb_graphics_DeviceHeight()/2)|0)-((this.bb_nextImg.bbm_Height()/2)|0)),0);
				}else{
					if(this.bb_gameState=="loading"){
						bb_graphics_DrawImage(this.bb_arrange,(((bb_graphics_DeviceWidth()/2)|0)-((this.bb_arrange.bbm_Width()/2)|0)),(((bb_graphics_DeviceHeight()/2)|0)-((this.bb_arrange.bbm_Height()/2)|0)-150),0);
						bb_graphics_DrawImage(this.bb_load,(((bb_graphics_DeviceWidth()/2)|0)-((this.bb_nextImg.bbm_Width()/2)|0)),(((bb_graphics_DeviceHeight()/2)|0)-((this.bb_nextImg.bbm_Height()/2)|0)),0);
					}else{
						if(this.bb_gameState=="GameOver"){
							bb_graphics_DrawImage(this.bb_gameOver,250.0,250.0,0);
							this.bb_fontBig.bbm_DrawHTML("You got <b>"+String(this.bb_grid.bb_totalScore)+"</b> points",310,450);
							bb_graphics_DrawImage(this.bb_restart,(((bb_graphics_DeviceWidth()/2)|0)-((this.bb_nextImg.bbm_Width()/2)|0)),(((bb_graphics_DeviceHeight()/2)|0)-((this.bb_nextImg.bbm_Height()/2)|0)),0);
						}
					}
				}
			}
		}
	}
	return 0;
}
function bb_app_AppDevice(){
	gxtkApp.call(this);
	this.bb_app=null;
	this.bb_updateRate=0;
}
bb_app_AppDevice.prototype=extend_class(gxtkApp);
function bb_app_new2(bbt_app){
	this.bb_app=bbt_app;
	bb_graphics_SetGraphicsContext(bb_graphics_new.call(new bb_graphics_GraphicsContext,this.GraphicsDevice()));
	bb_input_SetInputDevice(this.InputDevice());
	bb_audio_SetAudioDevice(this.AudioDevice());
	return this;
}
function bb_app_new3(){
	return this;
}
bb_app_AppDevice.prototype.OnCreate=function(){
	bb_graphics_SetFont(null,32);
	return this.bb_app.bbm_OnCreate();
}
bb_app_AppDevice.prototype.OnUpdate=function(){
	return this.bb_app.bbm_OnUpdate();
}
bb_app_AppDevice.prototype.OnSuspend=function(){
	return this.bb_app.bbm_OnSuspend();
}
bb_app_AppDevice.prototype.OnResume=function(){
	return this.bb_app.bbm_OnResume();
}
bb_app_AppDevice.prototype.OnRender=function(){
	bb_graphics_BeginRender();
	var bbt_r=this.bb_app.bbm_OnRender();
	bb_graphics_EndRender();
	return bbt_r;
}
bb_app_AppDevice.prototype.OnLoading=function(){
	bb_graphics_BeginRender();
	var bbt_r=this.bb_app.bbm_OnLoading();
	bb_graphics_EndRender();
	return bbt_r;
}
bb_app_AppDevice.prototype.SetUpdateRate=function(bbt_hertz){
	gxtkApp.prototype.SetUpdateRate.call(this,bbt_hertz);
	this.bb_updateRate=bbt_hertz;
	return 0;
}
function bb_graphics_GraphicsContext(){
	Object.call(this);
	this.bb_device=null;
	this.bb_defaultFont=null;
	this.bb_font=null;
	this.bb_firstChar=0;
	this.bb_matrixSp=0;
	this.bb_ix=1.0;
	this.bb_iy=.0;
	this.bb_jx=.0;
	this.bb_jy=1.0;
	this.bb_tx=.0;
	this.bb_ty=.0;
	this.bb_tformed=0;
	this.bb_matDirty=0;
	this.bb_color_r=.0;
	this.bb_color_g=.0;
	this.bb_color_b=.0;
	this.bb_alpha=.0;
	this.bb_blend=0;
	this.bb_scissor_x=.0;
	this.bb_scissor_y=.0;
	this.bb_scissor_width=.0;
	this.bb_scissor_height=.0;
	this.bb_matrixStack=new_number_array(192);
}
function bb_graphics_new(bbt_device){
	this.bb_device=bbt_device;
	return this;
}
function bb_graphics_new2(){
	return this;
}
var bb_graphics_context;
function bb_graphics_SetGraphicsContext(bbt_gc){
	bb_graphics_context=bbt_gc;
	return 0;
}
var bb_input_device;
function bb_input_SetInputDevice(bbt_dev){
	bb_input_device=bbt_dev;
	return 0;
}
var bb_audio_device;
function bb_audio_SetAudioDevice(bbt_dev){
	bb_audio_device=bbt_dev;
	return 0;
}
var bb_app_device;
function bbMain(){
	bb_gb_new.call(new bb_gb_GameApp);
	return 0;
}
function bb_graphics_Image(){
	Object.call(this);
	this.bb_surface=null;
	this.bb_width=0;
	this.bb_height=0;
	this.bb_frames=[];
	this.bb_flags=0;
	this.bb_tx=.0;
	this.bb_ty=.0;
	this.bb_source=null;
}
var bb_graphics_DefaultFlags;
function bb_graphics_new3(){
	return this;
}
bb_graphics_Image.prototype.bbm_SetHandle=function(bbt_tx,bbt_ty){
	this.bb_tx=bbt_tx;
	this.bb_ty=bbt_ty;
	this.bb_flags=this.bb_flags&-2;
	return 0;
}
bb_graphics_Image.prototype.bbm_ApplyFlags=function(bbt_iflags){
	this.bb_flags=bbt_iflags;
	if((this.bb_flags&2)!=0){
		var bbt_=this.bb_frames;
		var bbt_2=0;
		while(bbt_2<bbt_.length){
			var bbt_f=bbt_[bbt_2];
			bbt_2=bbt_2+1;
			bbt_f.bb_x+=1;
		}
		this.bb_width-=2;
	}
	if((this.bb_flags&4)!=0){
		var bbt_3=this.bb_frames;
		var bbt_4=0;
		while(bbt_4<bbt_3.length){
			var bbt_f2=bbt_3[bbt_4];
			bbt_4=bbt_4+1;
			bbt_f2.bb_y+=1;
		}
		this.bb_height-=2;
	}
	if((this.bb_flags&1)!=0){
		this.bbm_SetHandle((this.bb_width)/2.0,(this.bb_height)/2.0);
	}
	if(this.bb_frames.length==1 && this.bb_frames[0].bb_x==0 && this.bb_frames[0].bb_y==0 && this.bb_width==this.bb_surface.Width() && this.bb_height==this.bb_surface.Height()){
		this.bb_flags|=65536;
	}
	return 0;
}
bb_graphics_Image.prototype.bbm_Load=function(bbt_path,bbt_nframes,bbt_iflags){
	this.bb_surface=bb_graphics_context.bb_device.LoadSurface(bbt_path);
	if(!((this.bb_surface)!=null)){
		return null;
	}
	this.bb_width=((this.bb_surface.Width()/bbt_nframes)|0);
	this.bb_height=this.bb_surface.Height();
	this.bb_frames=new_object_array(bbt_nframes);
	for(var bbt_i=0;bbt_i<bbt_nframes;bbt_i=bbt_i+1){
		this.bb_frames[bbt_i]=bb_graphics_new4.call(new bb_graphics_Frame,bbt_i*this.bb_width,0);
	}
	this.bbm_ApplyFlags(bbt_iflags);
	return this;
}
bb_graphics_Image.prototype.bbm_Grab=function(bbt_x,bbt_y,bbt_iwidth,bbt_iheight,bbt_nframes,bbt_iflags,bbt_source){
	this.bb_source=bbt_source;
	this.bb_surface=bbt_source.bb_surface;
	this.bb_width=bbt_iwidth;
	this.bb_height=bbt_iheight;
	this.bb_frames=new_object_array(bbt_nframes);
	var bbt_ix=bbt_x+bbt_source.bb_frames[0].bb_x;
	var bbt_iy=bbt_y+bbt_source.bb_frames[0].bb_y;
	for(var bbt_i=0;bbt_i<bbt_nframes;bbt_i=bbt_i+1){
		if(bbt_ix+this.bb_width>bbt_source.bb_width){
			bbt_ix=bbt_source.bb_frames[0].bb_x;
			bbt_iy+=this.bb_height;
		}
		if(bbt_ix+this.bb_width>bbt_source.bb_width || bbt_iy+this.bb_height>bbt_source.bb_height){
			error("Image frame outside surface");
		}
		this.bb_frames[bbt_i]=bb_graphics_new4.call(new bb_graphics_Frame,bbt_ix,bbt_iy);
		bbt_ix+=this.bb_width;
	}
	this.bbm_ApplyFlags(bbt_iflags);
	return this;
}
bb_graphics_Image.prototype.bbm_GrabImage=function(bbt_x,bbt_y,bbt_width,bbt_height,bbt_frames,bbt_flags){
	if(this.bb_frames.length!=1){
		return null;
	}
	return (bb_graphics_new3.call(new bb_graphics_Image)).bbm_Grab(bbt_x,bbt_y,bbt_width,bbt_height,bbt_frames,bbt_flags,this);
}
bb_graphics_Image.prototype.bbm_Width=function(){
	return this.bb_width;
}
bb_graphics_Image.prototype.bbm_Height=function(){
	return this.bb_height;
}
bb_graphics_Image.prototype.bbm_Frames=function(){
	return this.bb_frames.length;
}
function bb_graphics_Frame(){
	Object.call(this);
	this.bb_x=0;
	this.bb_y=0;
}
function bb_graphics_new4(bbt_x,bbt_y){
	this.bb_x=bbt_x;
	this.bb_y=bbt_y;
	return this;
}
function bb_graphics_new5(){
	return this;
}
function bb_graphics_LoadImage(bbt_path,bbt_frameCount,bbt_flags){
	return (bb_graphics_new3.call(new bb_graphics_Image)).bbm_Load(bbt_path,bbt_frameCount,bbt_flags);
}
function bb_graphics_LoadImage2(bbt_path,bbt_frameWidth,bbt_frameHeight,bbt_frameCount,bbt_flags){
	var bbt_atlas=(bb_graphics_new3.call(new bb_graphics_Image)).bbm_Load(bbt_path,1,0);
	if((bbt_atlas)!=null){
		return bbt_atlas.bbm_GrabImage(0,0,bbt_frameWidth,bbt_frameHeight,bbt_frameCount,bbt_flags);
	}
	return null;
}
function bb_graphics_SetFont(bbt_font,bbt_firstChar){
	if(!((bbt_font)!=null)){
		if(!((bb_graphics_context.bb_defaultFont)!=null)){
			bb_graphics_context.bb_defaultFont=bb_graphics_LoadImage("mojo_font.png",96,2);
		}
		bbt_font=bb_graphics_context.bb_defaultFont;
		bbt_firstChar=32;
	}
	bb_graphics_context.bb_font=bbt_font;
	bb_graphics_context.bb_firstChar=bbt_firstChar;
	return 0;
}
var bb_graphics_renderDevice;
function bb_graphics_SetMatrix(bbt_ix,bbt_iy,bbt_jx,bbt_jy,bbt_tx,bbt_ty){
	bb_graphics_context.bb_ix=bbt_ix;
	bb_graphics_context.bb_iy=bbt_iy;
	bb_graphics_context.bb_jx=bbt_jx;
	bb_graphics_context.bb_jy=bbt_jy;
	bb_graphics_context.bb_tx=bbt_tx;
	bb_graphics_context.bb_ty=bbt_ty;
	bb_graphics_context.bb_tformed=((bbt_ix!=1.0 || bbt_iy!=0.0 || bbt_jx!=0.0 || bbt_jy!=1.0 || bbt_tx!=0.0 || bbt_ty!=0.0)?1:0);
	bb_graphics_context.bb_matDirty=1;
	return 0;
}
function bb_graphics_SetMatrix2(bbt_m){
	bb_graphics_SetMatrix(bbt_m[0],bbt_m[1],bbt_m[2],bbt_m[3],bbt_m[4],bbt_m[5]);
	return 0;
}
function bb_graphics_SetColor(bbt_r,bbt_g,bbt_b){
	bb_graphics_context.bb_color_r=bbt_r;
	bb_graphics_context.bb_color_g=bbt_g;
	bb_graphics_context.bb_color_b=bbt_b;
	bb_graphics_context.bb_device.SetColor(bbt_r,bbt_g,bbt_b);
	return 0;
}
function bb_graphics_SetAlpha(bbt_alpha){
	bb_graphics_context.bb_alpha=bbt_alpha;
	bb_graphics_context.bb_device.SetAlpha(bbt_alpha);
	return 0;
}
function bb_graphics_SetBlend(bbt_blend){
	bb_graphics_context.bb_blend=bbt_blend;
	bb_graphics_context.bb_device.SetBlend(bbt_blend);
	return 0;
}
function bb_graphics_DeviceWidth(){
	return bb_graphics_context.bb_device.Width();
}
function bb_graphics_DeviceHeight(){
	return bb_graphics_context.bb_device.Height();
}
function bb_graphics_SetScissor(bbt_x,bbt_y,bbt_width,bbt_height){
	bb_graphics_context.bb_scissor_x=bbt_x;
	bb_graphics_context.bb_scissor_y=bbt_y;
	bb_graphics_context.bb_scissor_width=bbt_width;
	bb_graphics_context.bb_scissor_height=bbt_height;
	bb_graphics_context.bb_device.SetScissor(((bbt_x)|0),((bbt_y)|0),((bbt_width)|0),((bbt_height)|0));
	return 0;
}
function bb_graphics_BeginRender(){
	bb_graphics_renderDevice=bb_graphics_context.bb_device;
	bb_graphics_context.bb_matrixSp=0;
	bb_graphics_SetMatrix(1.0,0.0,0.0,1.0,0.0,0.0);
	bb_graphics_SetColor(255.0,255.0,255.0);
	bb_graphics_SetAlpha(1.0);
	bb_graphics_SetBlend(0);
	bb_graphics_SetScissor(0.0,0.0,(bb_graphics_DeviceWidth()),(bb_graphics_DeviceHeight()));
	return 0;
}
function bb_graphics_EndRender(){
	bb_graphics_renderDevice=null;
	return 0;
}
function bb_angelfont_AngelFont(){
	Object.call(this);
	this.bb_iniText="";
	this.bb_kernPairs=bb_map_new2.call(new bb_map_StringMap);
	this.bb_chars=new_object_array(256);
	this.bb_height=0;
	this.bb_heightOffset=9999;
	this.bb_image=null;
	this.bb_name="";
	this.bb_xOffset=0;
	this.bb_useKerning=true;
	this.bb_italicSkew=0.25;
}
var bb_angelfont_error;
var bb_angelfont_current;
bb_angelfont_AngelFont.prototype.bbm_LoadFont=function(bbt_url){
	bb_angelfont_error="";
	bb_angelfont_current=this;
	this.bb_iniText=bb_app_LoadString(bbt_url+".txt");
	var bbt_lines=this.bb_iniText.split(String.fromCharCode(10));
	var bbt_=bbt_lines;
	var bbt_2=0;
	while(bbt_2<bbt_.length){
		var bbt_line=bbt_[bbt_2];
		bbt_2=bbt_2+1;
		bbt_line=string_trim(bbt_line);
		if(string_starts_with(bbt_line,"id,") || bbt_line==""){
			continue;
		}
		if(string_starts_with(bbt_line,"first,")){
			continue;
		}
		var bbt_data=bbt_line.split(",");
		for(var bbt_i=0;bbt_i<bbt_data.length;bbt_i=bbt_i+1){
			bbt_data[bbt_i]=string_trim(bbt_data[bbt_i]);
		}
		bb_angelfont_error+=String(bbt_data.length)+",";
		if(bbt_data.length>0){
			if(bbt_data.length==3){
				this.bb_kernPairs.bbm_Insert((bb_boxes_new3.call(new bb_boxes_StringObject,String.fromCharCode(parseInt((bbt_data[0]),10))+"_"+String.fromCharCode(parseInt((bbt_data[1]),10)))),bb_kernpair_new.call(new bb_kernpair_KernPair,parseInt((bbt_data[0]),10),parseInt((bbt_data[1]),10),parseInt((bbt_data[2]),10)));
			}else{
				if(bbt_data.length>=8){
					this.bb_chars[parseInt((bbt_data[0]),10)]=bb_char_new.call(new bb_char_Char,parseInt((bbt_data[1]),10),parseInt((bbt_data[2]),10),parseInt((bbt_data[3]),10),parseInt((bbt_data[4]),10),parseInt((bbt_data[5]),10),parseInt((bbt_data[6]),10),parseInt((bbt_data[7]),10));
					var bbt_ch=this.bb_chars[parseInt((bbt_data[0]),10)];
					if(bbt_ch.bb_height>this.bb_height){
						this.bb_height=bbt_ch.bb_height;
					}
					if(bbt_ch.bb_yOffset<this.bb_heightOffset){
						this.bb_heightOffset=bbt_ch.bb_yOffset;
					}
				}
			}
		}
	}
	this.bb_image=bb_graphics_LoadImage(bbt_url+".png",1,bb_graphics_DefaultFlags);
}
var bb_angelfont__list;
function bb_angelfont_new(bbt_url){
	if(bbt_url!=""){
		this.bbm_LoadFont(bbt_url);
		this.bb_name=bbt_url;
		bb_angelfont__list.bbm_Insert((bb_boxes_new3.call(new bb_boxes_StringObject,bbt_url)),this);
		print("Loading font from "+bbt_url);
	}
	return this;
}
function bb_angelfont_new2(){
	return this;
}
bb_angelfont_AngelFont.prototype.bbm_TextHeight=function(bbt_txt){
	var bbt_h=0;
	for(var bbt_i=0;bbt_i<bbt_txt.length;bbt_i=bbt_i+1){
		var bbt_asc=bbt_txt.charCodeAt(bbt_i);
		var bbt_ac=this.bb_chars[bbt_asc];
		if(bbt_ac.bb_height>bbt_h){
			bbt_h=bbt_ac.bb_height;
		}
	}
	return bbt_h;
}
bb_angelfont_AngelFont.prototype.bbm_DrawHTML=function(bbt_txt,bbt_x,bbt_y){
	var bbt_prevChar="";
	this.bb_xOffset=0;
	var bbt_italic=false;
	var bbt_bold=false;
	var bbt_th=(this.bbm_TextHeight(bbt_txt));
	for(var bbt_i=0;bbt_i<bbt_txt.length;bbt_i=bbt_i+1){
		while(bbt_txt.slice(bbt_i,bbt_i+1)=="<"){
			var bbt_=bbt_txt.slice(bbt_i+1,bbt_i+3);
			if(bbt_=="i>"){
				bbt_italic=true;
				bbt_i+=3;
			}else{
				if(bbt_=="b>"){
					bbt_bold=true;
					bbt_i+=3;
				}else{
					var bbt_2=bbt_txt.slice(bbt_i+1,bbt_i+4);
					if(bbt_2=="/i>"){
						bbt_italic=false;
						bbt_i+=4;
					}else{
						if(bbt_2=="/b>"){
							bbt_bold=false;
							bbt_i+=4;
						}
					}
				}
			}
			if(bbt_i>=bbt_txt.length){
				return;
			}
		}
		var bbt_asc=bbt_txt.charCodeAt(bbt_i);
		var bbt_ac=this.bb_chars[bbt_asc];
		var bbt_thisChar=String.fromCharCode(bbt_asc);
		if(bbt_ac!=null){
			if(this.bb_useKerning){
				var bbt_key=bbt_prevChar+"_"+bbt_thisChar;
				if(this.bb_kernPairs.bbm_Contains(bb_boxes_new3.call(new bb_boxes_StringObject,bbt_key))){
					this.bb_xOffset+=this.bb_kernPairs.bbm_Get(bb_boxes_new3.call(new bb_boxes_StringObject,bbt_key)).bb_amount;
				}
			}
			if(bbt_italic==false){
				bbt_ac.bbm_Draw(this.bb_image,bbt_x+this.bb_xOffset,bbt_y);
				if(bbt_bold){
					bbt_ac.bbm_Draw(this.bb_image,bbt_x+this.bb_xOffset+1,bbt_y);
				}
			}else{
				bb_graphics_PushMatrix();
				bb_graphics_Transform(1.0,0.0,-this.bb_italicSkew,1.0,(bbt_x+this.bb_xOffset)+bbt_th*this.bb_italicSkew,(bbt_y));
				bbt_ac.bbm_Draw(this.bb_image,0,0);
				if(bbt_bold){
					bbt_ac.bbm_Draw(this.bb_image,1,0);
				}
				bb_graphics_PopMatrix();
			}
			this.bb_xOffset+=bbt_ac.bb_xAdvance;
			bbt_prevChar=bbt_thisChar;
		}
	}
}
function bb_angelfont_StripHTML(bbt_txt){
	var bbt_plainText=string_replace(bbt_txt,"</","<");
	bbt_plainText=string_replace(bbt_plainText,"<b>","");
	return string_replace(bbt_plainText,"<i>","");
}
bb_angelfont_AngelFont.prototype.bbm_TextWidth=function(bbt_txt){
	var bbt_prevChar="";
	var bbt_width=0;
	for(var bbt_i=0;bbt_i<bbt_txt.length;bbt_i=bbt_i+1){
		var bbt_asc=bbt_txt.charCodeAt(bbt_i);
		var bbt_ac=this.bb_chars[bbt_asc];
		var bbt_thisChar=String.fromCharCode(bbt_asc);
		if(bbt_ac!=null){
			if(this.bb_useKerning){
				var bbt_key=bbt_prevChar+"_"+bbt_thisChar;
				if(this.bb_kernPairs.bbm_Contains(bb_boxes_new3.call(new bb_boxes_StringObject,bbt_key))){
					bbt_width+=this.bb_kernPairs.bbm_Get(bb_boxes_new3.call(new bb_boxes_StringObject,bbt_key)).bb_amount;
				}
			}
			bbt_width+=bbt_ac.bb_xAdvance;
			bbt_prevChar=bbt_thisChar;
		}
	}
	return bbt_width;
}
bb_angelfont_AngelFont.prototype.bbm_DrawHTML2=function(bbt_txt,bbt_x,bbt_y,bbt_align){
	this.bb_xOffset=0;
	var bbt_=bbt_align;
	if(bbt_==1){
		this.bbm_DrawHTML(bbt_txt,bbt_x-((this.bbm_TextWidth(bb_angelfont_StripHTML(bbt_txt))/2)|0),bbt_y);
	}else{
		if(bbt_==2){
			this.bbm_DrawHTML(bbt_txt,bbt_x-this.bbm_TextWidth(bb_angelfont_StripHTML(bbt_txt)),bbt_y);
		}else{
			if(bbt_==0){
				this.bbm_DrawHTML(bbt_txt,bbt_x,bbt_y);
			}
		}
	}
}
function bb_app_LoadString(bbt_path){
	return bb_app_device.LoadString(bbt_path);
}
function bb_kernpair_KernPair(){
	Object.call(this);
	this.bb_first="";
	this.bb_second="";
	this.bb_amount=0;
}
function bb_kernpair_new(bbt_first,bbt_second,bbt_amount){
	this.bb_first=String(bbt_first);
	this.bb_second=String(bbt_second);
	this.bb_amount=bbt_amount;
	return this;
}
function bb_kernpair_new2(){
	return this;
}
function bb_boxes_StringObject(){
	Object.call(this);
	this.bb_value="";
}
function bb_boxes_new(bbt_value){
	this.bb_value=String(bbt_value);
	return this;
}
function bb_boxes_new2(bbt_value){
	this.bb_value=String(bbt_value);
	return this;
}
function bb_boxes_new3(bbt_value){
	this.bb_value=bbt_value;
	return this;
}
function bb_boxes_new4(){
	return this;
}
function bb_map_Map(){
	Object.call(this);
	this.bb_root=null;
}
function bb_map_new(){
	return this;
}
bb_map_Map.prototype.bbm_Compare=function(bbt_lhs,bbt_rhs){
}
bb_map_Map.prototype.bbm_RotateLeft=function(bbt_node){
	var bbt_child=bbt_node.bb_right;
	bbt_node.bb_right=bbt_child.bb_left;
	if((bbt_child.bb_left)!=null){
		bbt_child.bb_left.bb_parent=bbt_node;
	}
	bbt_child.bb_parent=bbt_node.bb_parent;
	if((bbt_node.bb_parent)!=null){
		if(bbt_node==bbt_node.bb_parent.bb_left){
			bbt_node.bb_parent.bb_left=bbt_child;
		}else{
			bbt_node.bb_parent.bb_right=bbt_child;
		}
	}else{
		this.bb_root=bbt_child;
	}
	bbt_child.bb_left=bbt_node;
	bbt_node.bb_parent=bbt_child;
	return 0;
}
bb_map_Map.prototype.bbm_RotateRight=function(bbt_node){
	var bbt_child=bbt_node.bb_left;
	bbt_node.bb_left=bbt_child.bb_right;
	if((bbt_child.bb_right)!=null){
		bbt_child.bb_right.bb_parent=bbt_node;
	}
	bbt_child.bb_parent=bbt_node.bb_parent;
	if((bbt_node.bb_parent)!=null){
		if(bbt_node==bbt_node.bb_parent.bb_right){
			bbt_node.bb_parent.bb_right=bbt_child;
		}else{
			bbt_node.bb_parent.bb_left=bbt_child;
		}
	}else{
		this.bb_root=bbt_child;
	}
	bbt_child.bb_right=bbt_node;
	bbt_node.bb_parent=bbt_child;
	return 0;
}
bb_map_Map.prototype.bbm_InsertFixup=function(bbt_node){
	while(((bbt_node.bb_parent)!=null) && bbt_node.bb_parent.bb_color==-1 && ((bbt_node.bb_parent.bb_parent)!=null)){
		if(bbt_node.bb_parent==bbt_node.bb_parent.bb_parent.bb_left){
			var bbt_uncle=bbt_node.bb_parent.bb_parent.bb_right;
			if(((bbt_uncle)!=null) && bbt_uncle.bb_color==-1){
				bbt_node.bb_parent.bb_color=1;
				bbt_uncle.bb_color=1;
				bbt_uncle.bb_parent.bb_color=-1;
				bbt_node=bbt_uncle.bb_parent;
			}else{
				if(bbt_node==bbt_node.bb_parent.bb_right){
					bbt_node=bbt_node.bb_parent;
					this.bbm_RotateLeft(bbt_node);
				}
				bbt_node.bb_parent.bb_color=1;
				bbt_node.bb_parent.bb_parent.bb_color=-1;
				this.bbm_RotateRight(bbt_node.bb_parent.bb_parent);
			}
		}else{
			var bbt_uncle2=bbt_node.bb_parent.bb_parent.bb_left;
			if(((bbt_uncle2)!=null) && bbt_uncle2.bb_color==-1){
				bbt_node.bb_parent.bb_color=1;
				bbt_uncle2.bb_color=1;
				bbt_uncle2.bb_parent.bb_color=-1;
				bbt_node=bbt_uncle2.bb_parent;
			}else{
				if(bbt_node==bbt_node.bb_parent.bb_left){
					bbt_node=bbt_node.bb_parent;
					this.bbm_RotateRight(bbt_node);
				}
				bbt_node.bb_parent.bb_color=1;
				bbt_node.bb_parent.bb_parent.bb_color=-1;
				this.bbm_RotateLeft(bbt_node.bb_parent.bb_parent);
			}
		}
	}
	this.bb_root.bb_color=1;
	return 0;
}
bb_map_Map.prototype.bbm_Set=function(bbt_key,bbt_value){
	var bbt_node=this.bb_root;
	var bbt_parent=null;
	var bbt_cmp=0;
	while((bbt_node)!=null){
		bbt_parent=bbt_node;
		bbt_cmp=this.bbm_Compare(bbt_key,bbt_node.bb_key);
		if(bbt_cmp>0){
			bbt_node=bbt_node.bb_right;
		}else{
			if(bbt_cmp<0){
				bbt_node=bbt_node.bb_left;
			}else{
				bbt_node.bb_value=bbt_value;
				return 0;
			}
		}
	}
	bbt_node=bb_map_new3.call(new bb_map_Node,bbt_key,bbt_value,-1,bbt_parent);
	if(!((bbt_parent)!=null)){
		this.bb_root=bbt_node;
		return 0;
	}
	if(bbt_cmp>0){
		bbt_parent.bb_right=bbt_node;
	}else{
		bbt_parent.bb_left=bbt_node;
	}
	this.bbm_InsertFixup(bbt_node);
	return 0;
}
bb_map_Map.prototype.bbm_Insert=function(bbt_key,bbt_value){
	return this.bbm_Set(bbt_key,bbt_value);
}
bb_map_Map.prototype.bbm_FindNode=function(bbt_key){
	var bbt_node=this.bb_root;
	while((bbt_node)!=null){
		var bbt_cmp=this.bbm_Compare(bbt_key,bbt_node.bb_key);
		if(bbt_cmp>0){
			bbt_node=bbt_node.bb_right;
		}else{
			if(bbt_cmp<0){
				bbt_node=bbt_node.bb_left;
			}else{
				return bbt_node;
			}
		}
	}
	return bbt_node;
}
bb_map_Map.prototype.bbm_Contains=function(bbt_key){
	return this.bbm_FindNode(bbt_key)!=null;
}
bb_map_Map.prototype.bbm_Get=function(bbt_key){
	var bbt_node=this.bbm_FindNode(bbt_key);
	if((bbt_node)!=null){
		return bbt_node.bb_value;
	}
	return null;
}
function bb_map_StringMap(){
	bb_map_Map.call(this);
}
bb_map_StringMap.prototype=extend_class(bb_map_Map);
function bb_map_new2(){
	bb_map_new.call(this);
	return this;
}
bb_map_StringMap.prototype.bbm_Compare=function(bbt_lhs,bbt_rhs){
	return string_compare(bbt_lhs.bb_value,bbt_rhs.bb_value);
}
function bb_map_Node(){
	Object.call(this);
	this.bb_key=null;
	this.bb_right=null;
	this.bb_left=null;
	this.bb_value=null;
	this.bb_color=0;
	this.bb_parent=null;
}
function bb_map_new3(bbt_key,bbt_value,bbt_color,bbt_parent){
	this.bb_key=bbt_key;
	this.bb_value=bbt_value;
	this.bb_color=bbt_color;
	this.bb_parent=bbt_parent;
	return this;
}
function bb_map_new4(){
	return this;
}
function bb_char_Char(){
	Object.call(this);
	this.bb_x=0;
	this.bb_y=0;
	this.bb_width=0;
	this.bb_height=0;
	this.bb_xOffset=0;
	this.bb_yOffset=0;
	this.bb_xAdvance=0;
}
function bb_char_new(bbt_x,bbt_y,bbt_w,bbt_h,bbt_xoff,bbt_yoff,bbt_xadv){
	this.bb_x=bbt_x;
	this.bb_y=bbt_y;
	this.bb_width=bbt_w;
	this.bb_height=bbt_h;
	this.bb_xOffset=bbt_xoff;
	this.bb_yOffset=bbt_yoff;
	this.bb_xAdvance=bbt_xadv;
	return this;
}
function bb_char_new2(){
	return this;
}
bb_char_Char.prototype.bbm_Draw=function(bbt_fontImage,bbt_linex,bbt_liney){
	bb_graphics_DrawImageRect(bbt_fontImage,(bbt_linex+this.bb_xOffset),(bbt_liney+this.bb_yOffset),this.bb_x,this.bb_y,this.bb_width,this.bb_height,0);
	return 0;
}
function bb_grid_Grid(){
	Object.call(this);
	this.bb_highlightImage=null;
	this.bb_loop=null;
	this.bb_myGrid=[];
	this.bb_randGrid=[];
	this.bb_font=null;
	this.bb_currentEnt=1;
	this.bb_currentTile=null;
	this.bb_noScoreCount=0;
	this.bb_goneInfinite=false;
	this.bb_totalScore=0;
	this.bb_activeTile=0;
	this.bb_currentExit=0;
	this.bb_numTiles=16;
	this.bb_marginLeft=215;
	this.bb_marginTop=50;
	this.bb_tweening=false;
	this.bb_queuedSwap1=0;
	this.bb_queuedSwap2=0;
	this.bb_tweenedTile1=null;
	this.bb_tweenedTile2=null;
	this.bb_tweenedTile1Index=0;
	this.bb_tweenedTile2Index=0;
	this.bb_spacing=2;
}
function bb_grid_new(){
	this.bb_highlightImage=bb_graphics_LoadImage("highlight.png",1,bb_graphics_DefaultFlags);
	this.bb_loop=bb_graphics_LoadImage("loop.png",1,bb_graphics_DefaultFlags);
	this.bb_myGrid=new_object_array(16);
	this.bb_randGrid=new_number_array(16);
	return this;
}
bb_grid_Grid.prototype.bbm_giveMeNext=function(bbt_current,bbt_exitPoint){
	if(bbt_current % 4==0 && bbt_exitPoint==4){
		return bbt_current+3;
	}else{
		if(bbt_current % 4==3 && bbt_exitPoint==2){
			return bbt_current-3;
		}else{
			if(bbt_current<4 && bbt_exitPoint==1){
				return bbt_current+12;
			}else{
				if(bbt_current>11 && bbt_exitPoint==3){
					return bbt_current-12;
				}else{
					if(bbt_exitPoint==1){
						return bbt_current-4;
					}else{
						if(bbt_exitPoint==2){
							return bbt_current+1;
						}else{
							if(bbt_exitPoint==3){
								return bbt_current+4;
							}else{
								if(bbt_exitPoint==4){
									return bbt_current-1;
								}else{
									print("Kaboom");
									return -1;
								}
							}
						}
					}
				}
			}
		}
	}
}
bb_grid_Grid.prototype.bbm_exitToEntrance=function(bbt_ext){
	if(bbt_ext<3){
		return bbt_ext+2;
	}else{
		return bbt_ext-2;
	}
}
bb_grid_Grid.prototype.bbm_setCurrentTile=function(bbt_oldExit){
	if(bbt_oldExit==0){
		return false;
	}
	this.bb_activeTile=this.bbm_giveMeNext(this.bb_activeTile,bbt_oldExit);
	this.bb_currentTile=this.bb_myGrid[this.bb_activeTile];
	this.bb_currentEnt=this.bbm_exitToEntrance(bbt_oldExit);
	if(!((this.bb_currentTile.bbm_getCanEnter(this.bb_currentEnt))!=0)){
		return false;
	}else{
		this.bb_currentExit=this.bb_currentTile.bbm_giveMeExit(this.bb_currentEnt);
		this.bb_currentTile.bb_currentAnimation=this.bb_currentTile.bbm_GetAnimation(this.bb_currentEnt,this.bb_currentExit);
		this.bb_currentTile.bb_currentAnimation.bbm_Play();
	}
	return true;
}
bb_grid_Grid.prototype.bbm_Update=function(){
	if(!((this.bb_currentTile.bbm_getCanEnter(this.bb_currentEnt))!=0)){
		return false;
	}else{
		if(this.bb_currentTile.bb_done){
			var bbt_points=(this.bb_currentTile.bbm_getScore());
			if(bbt_points<=0.0){
				this.bb_noScoreCount+=1;
			}else{
				this.bb_noScoreCount=0;
				this.bb_goneInfinite=false;
			}
			if(this.bb_noScoreCount>=4){
				this.bb_goneInfinite=true;
			}
			this.bb_totalScore=(((this.bb_totalScore)+bbt_points)|0);
			this.bb_currentTile.bb_done=false;
			var bbt_oldExit=this.bb_currentTile.bbm_giveMeExit(this.bb_currentEnt);
			return this.bbm_setCurrentTile(bbt_oldExit);
		}else{
			this.bb_currentTile.bbm_UpdateAnimation();
			return true;
		}
	}
}
bb_grid_Grid.prototype.bbm_fillRandomList=function(){
	var bbt_gridder=new_number_array(bb_globals_numTileTypes+1);
	for(var bbt_count=0;bbt_count<=bb_globals_numTileTypes;bbt_count=bbt_count+1){
		if(bbt_count==9 || bbt_count==10 || bbt_count==11){
			bbt_gridder[bbt_count]=2;
		}else{
			if(bbt_count==8 || bbt_count==4){
				bbt_gridder[bbt_count]=2;
			}else{
				bbt_gridder[bbt_count]=0;
			}
		}
	}
	bb_random_Seed=bb_app_Millisecs();
	var bbt_counter=0;
	var bbt_tester=true;
	while(bbt_tester){
		var bbt_temp=((bb_random_Rnd2(1.0,(bb_globals_numTileTypes)+0.5))|0);
		var bbt_temp2=bbt_temp;
		if(bbt_temp==8){
			bbt_temp2=9;
		}
		if(bbt_gridder[bbt_temp2]==3){
		}
		if(bbt_gridder[bbt_temp2]<3){
			bbt_gridder[bbt_temp2]=bbt_gridder[bbt_temp2]+1;
			this.bb_randGrid[bbt_counter]=bbt_temp;
			bbt_counter=bbt_counter+1;
		}
		if(bbt_counter==16){
			bbt_tester=false;
		}
	}
	return 0;
}
bb_grid_Grid.prototype.bbm_fillGrid=function(){
	this.bbm_fillRandomList();
	for(var bbt_counter=0;bbt_counter<=this.bb_numTiles-1;bbt_counter=bbt_counter+1){
		var bbt_=this.bb_randGrid[bbt_counter];
		if(bbt_==1){
			this.bb_myGrid[bbt_counter]=(bb_tiles_new.call(new bb_tiles_Tile1));
		}else{
			if(bbt_==2){
				this.bb_myGrid[bbt_counter]=(bb_tiles_new2.call(new bb_tiles_Tile2));
			}else{
				if(bbt_==3){
					this.bb_myGrid[bbt_counter]=(bb_tiles_new3.call(new bb_tiles_Tile3));
				}else{
					if(bbt_==4){
						this.bb_myGrid[bbt_counter]=(bb_tiles_new4.call(new bb_tiles_Tile4));
					}else{
						if(bbt_==5){
							this.bb_myGrid[bbt_counter]=(bb_tiles_new5.call(new bb_tiles_Tile5));
						}else{
							if(bbt_==6){
								this.bb_myGrid[bbt_counter]=(bb_tiles_new6.call(new bb_tiles_Tile6));
							}else{
								if(bbt_==7){
									this.bb_myGrid[bbt_counter]=(bb_tiles_new7.call(new bb_tiles_Tile7));
								}else{
									if(bbt_==8){
										this.bb_myGrid[bbt_counter]=(bb_tiles_new8.call(new bb_tiles_Tile9));
									}else{
										if(bbt_==9){
											this.bb_myGrid[bbt_counter]=(bb_tiles_new9.call(new bb_tiles_Tile10));
										}else{
											if(bbt_==10){
												this.bb_myGrid[bbt_counter]=(bb_tiles_new10.call(new bb_tiles_Tile11));
											}else{
												if(bbt_==11){
													this.bb_myGrid[bbt_counter]=(bb_tiles_new11.call(new bb_tiles_Tile12));
												}else{
													if(bbt_==12){
														this.bb_myGrid[bbt_counter]=(bb_tiles_new12.call(new bb_tiles_Tile13));
													}
												}
											}
										}
									}
								}
							}
						}
					}
				}
			}
		}
	}
	return 0;
}
bb_grid_Grid.prototype.bbm_selectTile=function(bbt_u){
	var bbt_t=this.bb_myGrid[bbt_u];
	bbt_t.bb_selected=true;
	return 0;
}
bb_grid_Grid.prototype.bbm_deselectTile=function(bbt_u){
	var bbt_t=this.bb_myGrid[bbt_u];
	bbt_t.bb_selected=false;
	return 0;
}
bb_grid_Grid.prototype.bbm_GetTileX=function(bbt_tileIndex){
	var bbt_pos=bbt_tileIndex % 4;
	return bbt_pos;
}
bb_grid_Grid.prototype.bbm_GetTileY=function(bbt_tileIndex){
	var bbt_pos=((bbt_tileIndex/4)|0);
	return bbt_pos;
}
bb_grid_Grid.prototype.bbm_swapTiles=function(bbt_u,bbt_v){
	if(this.bb_tweening){
		this.bb_queuedSwap1=bbt_u;
		this.bb_queuedSwap2=bbt_v;
	}else{
		this.bb_queuedSwap1=-1;
		this.bb_queuedSwap2=-1;
		this.bbm_deselectTile(bbt_u);
		this.bbm_deselectTile(bbt_v);
		var bbt_t1x=this.bbm_GetTileX(bbt_u);
		var bbt_t1y=this.bbm_GetTileY(bbt_u);
		var bbt_t2x=this.bbm_GetTileX(bbt_v);
		var bbt_t2y=this.bbm_GetTileY(bbt_v);
		this.bb_tweenedTile1=this.bb_myGrid[bbt_u];
		this.bb_tweenedTile2=this.bb_myGrid[bbt_v];
		this.bb_tweenedTile1Index=bbt_u;
		this.bb_tweenedTile2Index=bbt_v;
		var bbt_dx=(bbt_t2x-bbt_t1x)*200;
		var bbt_dy=(bbt_t2y-bbt_t1y)*200;
		this.bb_tweenedTile1.bbm_Move(bbt_dx,bbt_dy);
		this.bb_tweenedTile2.bbm_Move(-bbt_dx,-bbt_dy);
		this.bb_tweening=true;
	}
	return 0;
}
bb_grid_Grid.prototype.bbm_swapTileIndex=function(bbt_u,bbt_v){
	var bbt_tileHolder=this.bb_myGrid[bbt_u];
	this.bb_myGrid[bbt_u]=this.bb_myGrid[bbt_v];
	this.bb_myGrid[bbt_v]=bbt_tileHolder;
	return 0;
}
bb_grid_Grid.prototype.bbm_Render=function(){
	var bbt_row=-1;
	var bbt_col=0;
	if(this.bb_tweening){
		if(this.bb_tweenedTile1.bb_moving){
			this.bb_tweenedTile1.bbm_UpdateMove();
		}
		if(this.bb_tweenedTile2.bb_moving){
			this.bb_tweenedTile2.bbm_UpdateMove();
		}
		if(!this.bb_tweenedTile1.bb_moving && !this.bb_tweenedTile2.bb_moving){
			this.bb_tweening=false;
			this.bbm_swapTileIndex(this.bb_tweenedTile1Index,this.bb_tweenedTile2Index);
			this.bb_tweenedTile1.bbm_ResetPosition();
			this.bb_tweenedTile2.bbm_ResetPosition();
			if(this.bb_queuedSwap1!=-1){
				this.bbm_swapTiles(this.bb_queuedSwap1,this.bb_queuedSwap2);
				this.bb_queuedSwap1=-1;
				this.bb_queuedSwap2=-1;
			}
		}
	}
	for(var bbt_counter=0;bbt_counter<=this.bb_numTiles-1;bbt_counter=bbt_counter+1){
		if(bbt_counter % 4==0){
			bbt_row=bbt_row+1;
		}
		bbt_col=bbt_counter % 4;
		var bbt_t=this.bb_myGrid[bbt_counter];
		var bbt_yDraw=(this.bb_marginTop+bbt_row*200+bbt_row*this.bb_spacing);
		var bbt_xDraw=(this.bb_marginLeft+bbt_col*200+bbt_col*this.bb_spacing);
		if(bbt_t.bb_currentAnimation.bb_img!=null){
			bb_graphics_DrawImage2(bbt_t.bb_currentAnimation.bb_img,bbt_t.bb_x+bbt_xDraw,bbt_t.bb_y+bbt_yDraw,bbt_t.bb_angle,1.0,1.0,bbt_t.bb_currentAnimation.bb_currentFrame-1);
		}
		if(bbt_t.bb_selected){
			bb_graphics_DrawImage(this.bb_highlightImage,bbt_xDraw,bbt_yDraw,0);
		}
	}
	if(this.bb_goneInfinite){
		bb_graphics_DrawImage(this.bb_loop,(this.bb_marginLeft+90),300.0,0);
	}
	return 0;
}
function bb_tile_Tile(){
	Object.call(this);
	this.bb_CanEnterOne=false;
	this.bb_CanEnterTwo=false;
	this.bb_CanEnterThree=false;
	this.bb_CanEnterFour=false;
	this.bb_done=false;
	this.bb_score=0;
	this.bb_scoreDivider=1;
	this.bb_EnterOneExit=0;
	this.bb_EnterTwoExit=0;
	this.bb_EnterThreeExit=0;
	this.bb_EnterFourExit=0;
	this.bb_animations=[];
	this.bb_currentAnimation=null;
	this.bb_selected=false;
	this.bb_xTarget=.0;
	this.bb_yTarget=.0;
	this.bb_moving=false;
	this.bb_x=.0;
	this.bb_y=.0;
	this.bb_moveSpeed=20.0;
	this.bb_angle=0.0;
}
bb_tile_Tile.prototype.bbm_getCanEnter=function(bbt_ent){
	if(bbt_ent==1){
		return ((this.bb_CanEnterOne)?1:0);
	}else{
		if(bbt_ent==2){
			return ((this.bb_CanEnterTwo)?1:0);
		}else{
			if(bbt_ent==3){
				return ((this.bb_CanEnterThree)?1:0);
			}else{
				if(bbt_ent==4){
					return ((this.bb_CanEnterFour)?1:0);
				}
			}
		}
	}
	return 0;
}
bb_tile_Tile.prototype.bbm_setScore=function(bbt_sc){
	this.bb_score=((bbt_sc/this.bb_scoreDivider)|0);
	return 0;
}
bb_tile_Tile.prototype.bbm_getScore=function(){
	var bbt_intTemp=this.bb_score;
	this.bb_scoreDivider=this.bb_scoreDivider+1;
	this.bbm_setScore(this.bb_score);
	return bbt_intTemp;
}
bb_tile_Tile.prototype.bbm_giveMeExit=function(bbt_ent){
	if(bbt_ent==1){
		return this.bb_EnterOneExit;
	}else{
		if(bbt_ent==2){
			return this.bb_EnterTwoExit;
		}else{
			if(bbt_ent==3){
				return this.bb_EnterThreeExit;
			}else{
				if(bbt_ent==4){
					return this.bb_EnterFourExit;
				}
			}
		}
	}
	return 0;
}
bb_tile_Tile.prototype.bbm_GetAnimation=function(bbt_tileEnter,bbt_tileExit){
	var bbt_thisAnim=this.bb_animations[bbt_tileEnter][bbt_tileExit];
	return bbt_thisAnim;
}
bb_tile_Tile.prototype.bbm_UpdateAnimation=function(){
	this.bb_currentAnimation.bbm_Update();
	this.bb_done=this.bb_currentAnimation.bb_donePlaying;
	return 0;
}
function bb_tile_new(){
	this.bb_animations=[new_object_array(5),new_object_array(5),new_object_array(5),new_object_array(5),new_object_array(5)];
	this.bb_selected=false;
	return this;
}
bb_tile_Tile.prototype.bbm_AddAnimation=function(bbt_tileEnter,bbt_tileExit,bbt_anim,bbt_xPos,bbt_yPos){
	this.bb_animations[bbt_tileEnter][bbt_tileExit]=bbt_anim;
	return null;
}
bb_tile_Tile.prototype.bbm_checkExits=function(){
	if(this.bb_CanEnterOne==false){
		this.bb_EnterOneExit=0;
	}
	if(this.bb_CanEnterTwo==false){
		this.bb_EnterTwoExit=0;
	}
	if(this.bb_CanEnterThree==false){
		this.bb_EnterThreeExit=0;
	}
	if(this.bb_CanEnterFour==false){
		this.bb_EnterFourExit=0;
	}
	return 0;
}
bb_tile_Tile.prototype.bbm_setCanEnterAll=function(bbt_one,bbt_two,bbt_three,bbt_four){
	this.bb_CanEnterOne=bbt_one;
	this.bb_CanEnterTwo=bbt_two;
	this.bb_CanEnterThree=bbt_three;
	this.bb_CanEnterFour=bbt_four;
	this.bbm_checkExits();
	return 0;
}
bb_tile_Tile.prototype.bbm_setExit=function(bbt_ent,bbt_ext){
	if(bbt_ent==1){
		this.bb_EnterOneExit=bbt_ext;
	}else{
		if(bbt_ent==2){
			this.bb_EnterTwoExit=bbt_ext;
		}else{
			if(bbt_ent==3){
				this.bb_EnterThreeExit=bbt_ext;
			}else{
				if(bbt_ent==4){
					this.bb_EnterFourExit=bbt_ext;
				}
			}
		}
	}
	return 0;
}
bb_tile_Tile.prototype.bbm_Move=function(bbt_xNew,bbt_yNew){
	this.bb_xTarget=(bbt_xNew);
	this.bb_yTarget=(bbt_yNew);
	this.bb_moving=true;
	return 0;
}
bb_tile_Tile.prototype.bbm_UpdateMove=function(){
	var bbt_dx=this.bb_xTarget-this.bb_x;
	var bbt_dy=this.bb_yTarget-this.bb_y;
	var bbt_dz=Math.sqrt(bbt_dx*bbt_dx+bbt_dy*bbt_dy);
	var bbt_damp=bbt_dz*0.01;
	var bbt_ang=(Math.atan2(bbt_dy,bbt_dx)*R2D);
	var bbt_mx=Math.cos((bbt_ang)*D2R)*this.bb_moveSpeed*bbt_damp;
	var bbt_my=Math.sin((bbt_ang)*D2R)*this.bb_moveSpeed*bbt_damp;
	var bbt_minSpeed=0.75;
	if(bbt_mx>0.0 && bbt_mx<bbt_minSpeed){
		bbt_mx=bbt_minSpeed;
	}
	if(bbt_mx<0.0 && bbt_mx>-bbt_minSpeed){
		bbt_mx=-bbt_minSpeed;
	}
	if(bbt_my>0.0 && bbt_my<bbt_minSpeed){
		bbt_my=bbt_minSpeed;
	}
	if(bbt_my<0.0 && bbt_my>-bbt_minSpeed){
		bbt_my=-bbt_minSpeed;
	}
	if(bb_math_Abs2(bbt_dx)<bbt_minSpeed){
		this.bb_x=this.bb_xTarget;
	}else{
		this.bb_x=this.bb_x+bbt_mx;
	}
	if(bb_math_Abs2(bbt_dy)<bbt_minSpeed){
		this.bb_y=this.bb_yTarget;
	}else{
		this.bb_y=this.bb_y+bbt_my;
	}
	if(this.bb_xTarget==this.bb_x && this.bb_yTarget==this.bb_y){
		this.bb_moving=false;
	}
	return 0;
}
bb_tile_Tile.prototype.bbm_ResetPosition=function(){
	this.bb_x=0.0;
	this.bb_y=0.0;
	return 0;
}
function bb_buttons_Button(){
	Object.call(this);
	this.bb_x=0;
	this.bb_y=0;
	this.bb_width=126;
	this.bb_height=30;
}
function bb_buttons_new(){
	return this;
}
bb_buttons_Button.prototype.bbm_setCoords=function(bbt_u,bbt_v){
	this.bb_x=bbt_u;
	this.bb_y=bbt_v;
	return 0;
}
bb_buttons_Button.prototype.bbm_inside=function(bbt_u,bbt_v){
	if(bbt_u>this.bb_x && bbt_u<this.bb_x+this.bb_width){
		if(bbt_v>this.bb_y && bbt_v<this.bb_y+this.bb_height){
			return true;
		}else{
			return false;
		}
	}else{
		return false;
	}
}
function bb_app_SetUpdateRate(bbt_hertz){
	return bb_app_device.SetUpdateRate(bbt_hertz);
}
function bb_animation_Animation(){
	Object.call(this);
	this.bb_playing=false;
	this.bb_paused=false;
	this.bb_donePlaying=false;
	this.bb_currentFrame=1;
	this.bb_frameCounter=0;
	this.bb_moving=false;
	this.bb_frameBuffer=1;
	this.bb_img=null;
	this.bb_xTarget=.0;
	this.bb_x=.0;
	this.bb_yTarget=.0;
	this.bb_y=.0;
	this.bb_moveSpeed=10.0;
}
bb_animation_Animation.prototype.bbm_Play=function(){
	this.bb_playing=true;
	this.bb_paused=false;
	this.bb_donePlaying=false;
	this.bb_currentFrame=1;
	this.bb_frameCounter=0;
	return 0;
}
bb_animation_Animation.prototype.bbm_Stop=function(){
	this.bb_playing=false;
	this.bb_paused=false;
	this.bb_currentFrame=1;
	this.bb_frameCounter=0;
	return 0;
}
bb_animation_Animation.prototype.bbm_Update=function(){
	if(this.bb_playing && !this.bb_paused && !this.bb_moving){
		this.bb_frameCounter+=1;
		if(this.bb_frameCounter>this.bb_frameBuffer){
			if(this.bb_currentFrame<=this.bb_img.bbm_Frames()){
				this.bb_currentFrame+=1;
			}
			if(this.bb_currentFrame>this.bb_img.bbm_Frames()){
				this.bb_currentFrame=1;
				this.bb_donePlaying=true;
				this.bbm_Stop();
			}
			this.bb_frameCounter=0;
		}
	}else{
		if(this.bb_moving){
			var bbt_dx=this.bb_xTarget-this.bb_x;
			var bbt_dy=this.bb_yTarget-this.bb_y;
			if(bbt_dx>0.0){
				this.bb_x=this.bb_x+this.bb_moveSpeed;
				if(this.bb_x>this.bb_xTarget){
					this.bb_x=this.bb_xTarget;
				}
			}else{
				if(bbt_dx<0.0){
					this.bb_x=this.bb_x-this.bb_moveSpeed;
					if(this.bb_x<this.bb_xTarget){
						this.bb_x=this.bb_xTarget;
					}
				}
			}
			if(this.bb_xTarget==this.bb_x && this.bb_yTarget==this.bb_y){
				this.bb_moving=false;
			}
		}
	}
	return 0;
}
function bb_animation_new(bbt_fileName,bbt_totalFrames,bbt_flags){
	this.bb_img=bb_graphics_LoadImage(bbt_fileName,bbt_totalFrames,bbt_flags);
	this.bb_paused=false;
	this.bb_playing=false;
	return this;
}
function bb_animation_new2(){
	return this;
}
function bb_input_KeyDown(bbt_key){
	return bb_input_device.KeyDown(bbt_key);
}
function bb_input_MouseDown(bbt_button){
	return bb_input_device.KeyDown(1+bbt_button);
}
function bb_input_MouseX(){
	return bb_input_device.MouseX();
}
function bb_input_MouseY(){
	return bb_input_device.MouseY();
}
function bb_globals_Globals(){
	Object.call(this);
}
var bb_globals_numTileTypes;
function bb_app_Millisecs(){
	return bb_app_device.MilliSecs();
}
var bb_random_Seed;
function bb_random_Rnd(){
	bb_random_Seed=bb_random_Seed*1664525+1013904223|0;
	return (bb_random_Seed>>8&16777215)/16777216.0;
}
function bb_random_Rnd2(bbt_low,bbt_high){
	return bb_random_Rnd3(bbt_high-bbt_low)+bbt_low;
}
function bb_random_Rnd3(bbt_range){
	return bb_random_Rnd()*bbt_range;
}
function bb_tiles_Tile1(){
	bb_tile_Tile.call(this);
}
bb_tiles_Tile1.prototype=extend_class(bb_tile_Tile);
function bb_tiles_new(){
	bb_tile_new.call(this);
	this.bbm_AddAnimation(1,4,bb_animation_new.call(new bb_animation_Animation,"tile01-1-4.jpg",9,0),0.0,0.0);
	this.bbm_AddAnimation(2,4,bb_animation_new.call(new bb_animation_Animation,"tile01-2-4.jpg",20,0),0.0,0.0);
	this.bbm_AddAnimation(3,0,bb_animation_new.call(new bb_animation_Animation,"tile01-3-0.jpg",10,0),0.0,0.0);
	this.bbm_AddAnimation(4,1,bb_animation_new.call(new bb_animation_Animation,"tile01-4-1.jpg",10,0),0.0,0.0);
	this.bbm_setCanEnterAll(true,true,true,true);
	this.bbm_setExit(1,4);
	this.bbm_setExit(2,4);
	this.bbm_setExit(3,0);
	this.bbm_setExit(4,1);
	this.bbm_setScore(10);
	this.bb_currentAnimation=this.bbm_GetAnimation(1,4);
	if(this.bb_currentAnimation==null){
		print("This animation is null, you need to try another");
	}
	this.bb_currentAnimation.bbm_Play();
	return this;
}
function bb_tiles_Tile2(){
	bb_tile_Tile.call(this);
}
bb_tiles_Tile2.prototype=extend_class(bb_tile_Tile);
function bb_tiles_new2(){
	bb_tile_new.call(this);
	this.bbm_AddAnimation(1,3,bb_animation_new.call(new bb_animation_Animation,"tile02-1-3.jpg",23,6),0.0,0.0);
	this.bbm_AddAnimation(2,4,bb_animation_new.call(new bb_animation_Animation,"tile02-2-4.jpg",62,6),0.0,0.0);
	this.bbm_AddAnimation(3,1,bb_animation_new.call(new bb_animation_Animation,"tile02-3-1.jpg",24,6),0.0,0.0);
	this.bbm_AddAnimation(4,3,bb_animation_new.call(new bb_animation_Animation,"tile02-4-3.jpg",75,6),0.0,0.0);
	this.bbm_setCanEnterAll(true,true,true,true);
	this.bbm_setExit(1,3);
	this.bbm_setExit(2,4);
	this.bbm_setExit(4,3);
	this.bbm_setExit(3,1);
	this.bbm_setScore(10);
	this.bb_currentAnimation=this.bbm_GetAnimation(1,3);
	if(this.bb_currentAnimation==null){
		print("This animation is null, you need to try another");
	}
	this.bb_currentAnimation.bbm_Play();
	return this;
}
function bb_tiles_Tile3(){
	bb_tile_Tile.call(this);
}
bb_tiles_Tile3.prototype=extend_class(bb_tile_Tile);
function bb_tiles_new3(){
	bb_tile_new.call(this);
	this.bbm_AddAnimation(1,4,bb_animation_new.call(new bb_animation_Animation,"tile03-1-4.jpg",56,0),0.0,0.0);
	this.bbm_AddAnimation(2,4,bb_animation_new.call(new bb_animation_Animation,"tile03-2-4.jpg",88,0),0.0,0.0);
	this.bbm_AddAnimation(3,4,bb_animation_new.call(new bb_animation_Animation,"tile03-3-4.jpg",47,0),0.0,0.0);
	this.bbm_AddAnimation(4,4,bb_animation_new.call(new bb_animation_Animation,"tile03-4-4.jpg",34,0),0.0,0.0);
	this.bbm_setCanEnterAll(true,true,true,true);
	this.bbm_setExit(1,4);
	this.bbm_setExit(2,4);
	this.bbm_setExit(3,4);
	this.bbm_setExit(4,4);
	this.bbm_setScore(10);
	this.bb_currentAnimation=this.bbm_GetAnimation(1,4);
	if(this.bb_currentAnimation==null){
		print("This animation is null, you need to try another");
	}
	this.bb_currentAnimation.bbm_Play();
	return this;
}
function bb_tiles_Tile4(){
	bb_tile_Tile.call(this);
}
bb_tiles_Tile4.prototype=extend_class(bb_tile_Tile);
function bb_tiles_new4(){
	bb_tile_new.call(this);
	this.bbm_AddAnimation(1,0,bb_animation_new.call(new bb_animation_Animation,"tile04-1-0.jpg",68,6),0.0,0.0);
	this.bbm_AddAnimation(2,0,bb_animation_new.call(new bb_animation_Animation,"tile04-2-0.jpg",64,6),0.0,0.0);
	this.bbm_AddAnimation(3,0,bb_animation_new.call(new bb_animation_Animation,"tile04-3-0.jpg",70,6),0.0,0.0);
	this.bbm_AddAnimation(4,0,bb_animation_new.call(new bb_animation_Animation,"tile04-4-0.jpg",63,6),0.0,0.0);
	this.bbm_setCanEnterAll(true,true,true,true);
	this.bbm_setExit(1,0);
	this.bbm_setExit(2,0);
	this.bbm_setExit(3,0);
	this.bbm_setExit(4,0);
	this.bbm_setScore(0);
	this.bb_currentAnimation=this.bbm_GetAnimation(1,0);
	if(this.bb_currentAnimation==null){
		print("This animation is null, you need to try another");
	}
	this.bb_currentAnimation.bbm_Play();
	return this;
}
function bb_tiles_Tile5(){
	bb_tile_Tile.call(this);
}
bb_tiles_Tile5.prototype=extend_class(bb_tile_Tile);
function bb_tiles_new5(){
	bb_tile_new.call(this);
	this.bbm_AddAnimation(3,2,bb_animation_new.call(new bb_animation_Animation,"tile05-3-2.jpg",15,6),0.0,0.0);
	this.bbm_AddAnimation(4,1,bb_animation_new.call(new bb_animation_Animation,"tile05-4-1.jpg",25,6),0.0,0.0);
	this.bbm_AddAnimation(2,3,bb_animation_new.call(new bb_animation_Animation,"tile05-2-3.jpg",14,6),0.0,0.0);
	this.bbm_AddAnimation(1,4,bb_animation_new.call(new bb_animation_Animation,"tile05-1-4.jpg",24,6),0.0,0.0);
	this.bbm_setCanEnterAll(true,true,true,true);
	this.bbm_setExit(3,2);
	this.bbm_setExit(4,1);
	this.bbm_setExit(2,3);
	this.bbm_setExit(1,4);
	this.bbm_setScore(10);
	this.bb_currentAnimation=this.bbm_GetAnimation(1,4);
	if(this.bb_currentAnimation==null){
		print("This animation is null, you need to try another");
	}
	this.bb_currentAnimation.bbm_Play();
	return this;
}
function bb_tiles_Tile6(){
	bb_tile_Tile.call(this);
}
bb_tiles_Tile6.prototype=extend_class(bb_tile_Tile);
function bb_tiles_new6(){
	bb_tile_new.call(this);
	this.bbm_AddAnimation(1,2,bb_animation_new.call(new bb_animation_Animation,"tile06-1-2.jpg",45,6),0.0,0.0);
	this.bbm_AddAnimation(2,4,bb_animation_new.call(new bb_animation_Animation,"tile06-2-4.jpg",27,6),0.0,0.0);
	this.bbm_AddAnimation(3,2,bb_animation_new.call(new bb_animation_Animation,"tile06-3-2.jpg",38,6),0.0,0.0);
	this.bbm_AddAnimation(4,2,bb_animation_new.call(new bb_animation_Animation,"tile06-4-2.jpg",39,6),0.0,0.0);
	this.bbm_setCanEnterAll(true,true,true,true);
	this.bbm_setExit(1,2);
	this.bbm_setExit(2,4);
	this.bbm_setExit(3,2);
	this.bbm_setExit(4,2);
	this.bbm_setScore(10);
	this.bb_currentAnimation=this.bbm_GetAnimation(1,2);
	if(this.bb_currentAnimation==null){
		print("This animation is null, you need to try another");
	}
	this.bb_currentAnimation.bbm_Play();
	return this;
}
function bb_tiles_Tile7(){
	bb_tile_Tile.call(this);
}
bb_tiles_Tile7.prototype=extend_class(bb_tile_Tile);
function bb_tiles_new7(){
	bb_tile_new.call(this);
	this.bbm_AddAnimation(1,1,bb_animation_new.call(new bb_animation_Animation,"tile07-1-1.jpg",23,0),0.0,0.0);
	this.bbm_AddAnimation(2,4,bb_animation_new.call(new bb_animation_Animation,"tile07-2-4.jpg",75,0),0.0,0.0);
	this.bbm_AddAnimation(4,2,bb_animation_new.call(new bb_animation_Animation,"tile07-4-2.jpg",79,0),0.0,0.0);
	this.bbm_setCanEnterAll(true,true,false,true);
	this.bbm_setExit(4,2);
	this.bbm_setExit(1,1);
	this.bbm_setExit(2,4);
	this.bbm_setScore(20);
	this.bb_currentAnimation=this.bbm_GetAnimation(1,1);
	if(this.bb_currentAnimation==null){
		print("This animation is null, you need to try another");
	}
	this.bb_currentAnimation.bbm_Play();
	return this;
}
function bb_tiles_Tile9(){
	bb_tile_Tile.call(this);
}
bb_tiles_Tile9.prototype=extend_class(bb_tile_Tile);
function bb_tiles_new8(){
	bb_tile_new.call(this);
	this.bbm_AddAnimation(1,2,bb_animation_new.call(new bb_animation_Animation,"tile09-1-2.jpg",67,0),0.0,0.0);
	this.bbm_AddAnimation(2,3,bb_animation_new.call(new bb_animation_Animation,"tile09-2-3.jpg",91,0),0.0,0.0);
	this.bbm_AddAnimation(3,1,bb_animation_new.call(new bb_animation_Animation,"tile09-3-1.jpg",52,0),0.0,0.0);
	this.bbm_AddAnimation(4,2,bb_animation_new.call(new bb_animation_Animation,"tile09-4-2.jpg",46,0),0.0,0.0);
	this.bbm_setCanEnterAll(true,true,true,true);
	this.bbm_setExit(1,2);
	this.bbm_setExit(2,3);
	this.bbm_setExit(3,1);
	this.bbm_setExit(4,2);
	this.bbm_setScore(10);
	this.bb_currentAnimation=this.bbm_GetAnimation(1,2);
	if(this.bb_currentAnimation==null){
		print("This animation is null, you need to try another");
	}
	this.bb_currentAnimation.bbm_Play();
	return this;
}
function bb_tiles_Tile10(){
	bb_tile_Tile.call(this);
}
bb_tiles_Tile10.prototype=extend_class(bb_tile_Tile);
function bb_tiles_new9(){
	bb_tile_new.call(this);
	this.bbm_AddAnimation(1,2,bb_animation_new.call(new bb_animation_Animation,"tile10-1-2.jpg",22,0),0.0,0.0);
	this.bbm_AddAnimation(2,1,bb_animation_new.call(new bb_animation_Animation,"tile10-2-1.jpg",16,0),0.0,0.0);
	this.bbm_AddAnimation(3,1,bb_animation_new.call(new bb_animation_Animation,"tile10-3-1.jpg",61,0),0.0,0.0);
	this.bbm_AddAnimation(4,2,bb_animation_new.call(new bb_animation_Animation,"tile10-4-2.jpg",28,0),0.0,0.0);
	this.bbm_setCanEnterAll(true,true,true,true);
	this.bbm_setExit(1,2);
	this.bbm_setExit(2,1);
	this.bbm_setExit(3,1);
	this.bbm_setExit(4,2);
	this.bbm_setScore(10);
	this.bb_currentAnimation=this.bbm_GetAnimation(1,2);
	if(this.bb_currentAnimation==null){
		print("This animation is null, you need to try another");
	}
	this.bb_currentAnimation.bbm_Play();
	return this;
}
function bb_tiles_Tile11(){
	bb_tile_Tile.call(this);
}
bb_tiles_Tile11.prototype=extend_class(bb_tile_Tile);
function bb_tiles_new10(){
	bb_tile_new.call(this);
	this.bbm_AddAnimation(1,1,bb_animation_new.call(new bb_animation_Animation,"tile11-1-1.jpg",29,0),0.0,0.0);
	this.bbm_AddAnimation(2,3,bb_animation_new.call(new bb_animation_Animation,"tile11-2-3.jpg",62,0),0.0,0.0);
	this.bbm_AddAnimation(3,1,bb_animation_new.call(new bb_animation_Animation,"tile11-3-1.jpg",32,0),0.0,0.0);
	this.bbm_AddAnimation(4,2,bb_animation_new.call(new bb_animation_Animation,"tile11-4-2.jpg",17,0),0.0,0.0);
	this.bbm_setCanEnterAll(true,true,true,true);
	this.bbm_setExit(1,1);
	this.bbm_setExit(2,3);
	this.bbm_setExit(3,1);
	this.bbm_setExit(4,2);
	this.bbm_setScore(10);
	this.bb_currentAnimation=this.bbm_GetAnimation(1,1);
	if(this.bb_currentAnimation==null){
		print("This animation is null, you need to try another");
	}
	this.bb_currentAnimation.bbm_Play();
	return this;
}
function bb_tiles_Tile12(){
	bb_tile_Tile.call(this);
}
bb_tiles_Tile12.prototype=extend_class(bb_tile_Tile);
function bb_tiles_new11(){
	bb_tile_new.call(this);
	this.bbm_AddAnimation(1,1,bb_animation_new.call(new bb_animation_Animation,"tile12-1-1.jpg",15,0),0.0,0.0);
	this.bbm_AddAnimation(2,3,bb_animation_new.call(new bb_animation_Animation,"tile12-2-3.jpg",44,0),0.0,0.0);
	this.bbm_AddAnimation(3,1,bb_animation_new.call(new bb_animation_Animation,"tile12-3-1.jpg",43,0),0.0,0.0);
	this.bbm_AddAnimation(4,4,bb_animation_new.call(new bb_animation_Animation,"tile12-4-4.jpg",37,0),0.0,0.0);
	this.bbm_setCanEnterAll(true,true,true,true);
	this.bbm_setExit(1,1);
	this.bbm_setExit(2,3);
	this.bbm_setExit(3,1);
	this.bbm_setExit(4,4);
	this.bb_currentAnimation=this.bbm_GetAnimation(1,1);
	if(this.bb_currentAnimation==null){
		print("This animation is null, you need to try another");
	}
	this.bb_currentAnimation.bbm_Play();
	return this;
}
function bb_tiles_Tile13(){
	bb_tile_Tile.call(this);
}
bb_tiles_Tile13.prototype=extend_class(bb_tile_Tile);
function bb_tiles_new12(){
	bb_tile_new.call(this);
	this.bbm_AddAnimation(2,4,bb_animation_new.call(new bb_animation_Animation,"tile13-2-4.jpg",58,0),0.0,0.0);
	this.bbm_AddAnimation(4,2,bb_animation_new.call(new bb_animation_Animation,"tile13-4-2.jpg",30,0),0.0,0.0);
	this.bbm_setCanEnterAll(false,true,false,true);
	this.bbm_setExit(2,4);
	this.bbm_setExit(4,2);
	this.bb_currentAnimation=this.bbm_GetAnimation(4,2);
	if(this.bb_currentAnimation==null){
		print("This animation is null, you need to try another");
	}
	this.bb_currentAnimation.bbm_Play();
	return this;
}
function bb_graphics_Cls(bbt_r,bbt_g,bbt_b){
	bb_graphics_renderDevice.Cls(bbt_r,bbt_g,bbt_b);
	return 0;
}
function bb_graphics_PushMatrix(){
	var bbt_sp=bb_graphics_context.bb_matrixSp;
	bb_graphics_context.bb_matrixStack[bbt_sp+0]=bb_graphics_context.bb_ix;
	bb_graphics_context.bb_matrixStack[bbt_sp+1]=bb_graphics_context.bb_iy;
	bb_graphics_context.bb_matrixStack[bbt_sp+2]=bb_graphics_context.bb_jx;
	bb_graphics_context.bb_matrixStack[bbt_sp+3]=bb_graphics_context.bb_jy;
	bb_graphics_context.bb_matrixStack[bbt_sp+4]=bb_graphics_context.bb_tx;
	bb_graphics_context.bb_matrixStack[bbt_sp+5]=bb_graphics_context.bb_ty;
	bb_graphics_context.bb_matrixSp=bbt_sp+6;
	return 0;
}
function bb_graphics_Transform(bbt_ix,bbt_iy,bbt_jx,bbt_jy,bbt_tx,bbt_ty){
	var bbt_ix2=bbt_ix*bb_graphics_context.bb_ix+bbt_iy*bb_graphics_context.bb_jx;
	var bbt_iy2=bbt_ix*bb_graphics_context.bb_iy+bbt_iy*bb_graphics_context.bb_jy;
	var bbt_jx2=bbt_jx*bb_graphics_context.bb_ix+bbt_jy*bb_graphics_context.bb_jx;
	var bbt_jy2=bbt_jx*bb_graphics_context.bb_iy+bbt_jy*bb_graphics_context.bb_jy;
	var bbt_tx2=bbt_tx*bb_graphics_context.bb_ix+bbt_ty*bb_graphics_context.bb_jx+bb_graphics_context.bb_tx;
	var bbt_ty2=bbt_tx*bb_graphics_context.bb_iy+bbt_ty*bb_graphics_context.bb_jy+bb_graphics_context.bb_ty;
	bb_graphics_SetMatrix(bbt_ix2,bbt_iy2,bbt_jx2,bbt_jy2,bbt_tx2,bbt_ty2);
	return 0;
}
function bb_graphics_Transform2(bbt_coords){
	var bbt_out=new_number_array(bbt_coords.length);
	for(var bbt_i=0;bbt_i<bbt_coords.length-1;bbt_i=bbt_i+2){
		var bbt_x=bbt_coords[bbt_i];
		var bbt_y=bbt_coords[bbt_i+1];
		bbt_out[bbt_i]=bbt_x*bb_graphics_context.bb_ix+bbt_y*bb_graphics_context.bb_jx+bb_graphics_context.bb_tx;
		bbt_out[bbt_i+1]=bbt_x*bb_graphics_context.bb_iy+bbt_y*bb_graphics_context.bb_jy+bb_graphics_context.bb_ty;
	}
	return bbt_out;
}
function bb_graphics_Translate(bbt_x,bbt_y){
	bb_graphics_Transform(1.0,0.0,0.0,1.0,bbt_x,bbt_y);
	return 0;
}
function bb_graphics_ValidateMatrix(){
	if((bb_graphics_context.bb_matDirty)!=0){
		bb_graphics_context.bb_device.SetMatrix(bb_graphics_context.bb_ix,bb_graphics_context.bb_iy,bb_graphics_context.bb_jx,bb_graphics_context.bb_jy,bb_graphics_context.bb_tx,bb_graphics_context.bb_ty);
		bb_graphics_context.bb_matDirty=0;
	}
	return 0;
}
function bb_graphics_PopMatrix(){
	var bbt_sp=bb_graphics_context.bb_matrixSp-6;
	bb_graphics_SetMatrix(bb_graphics_context.bb_matrixStack[bbt_sp+0],bb_graphics_context.bb_matrixStack[bbt_sp+1],bb_graphics_context.bb_matrixStack[bbt_sp+2],bb_graphics_context.bb_matrixStack[bbt_sp+3],bb_graphics_context.bb_matrixStack[bbt_sp+4],bb_graphics_context.bb_matrixStack[bbt_sp+5]);
	bb_graphics_context.bb_matrixSp=bbt_sp;
	return 0;
}
function bb_graphics_DrawImage(bbt_image,bbt_x,bbt_y,bbt_frame){
	var bbt_f=bbt_image.bb_frames[bbt_frame];
	if((bb_graphics_context.bb_tformed)!=0){
		bb_graphics_PushMatrix();
		bb_graphics_Translate(bbt_x-bbt_image.bb_tx,bbt_y-bbt_image.bb_ty);
		bb_graphics_ValidateMatrix();
		if((bbt_image.bb_flags&65536)!=0){
			bb_graphics_context.bb_device.DrawSurface(bbt_image.bb_surface,0.0,0.0);
		}else{
			bb_graphics_context.bb_device.DrawSurface2(bbt_image.bb_surface,0.0,0.0,bbt_f.bb_x,bbt_f.bb_y,bbt_image.bb_width,bbt_image.bb_height);
		}
		bb_graphics_PopMatrix();
	}else{
		bb_graphics_ValidateMatrix();
		if((bbt_image.bb_flags&65536)!=0){
			bb_graphics_context.bb_device.DrawSurface(bbt_image.bb_surface,bbt_x-bbt_image.bb_tx,bbt_y-bbt_image.bb_ty);
		}else{
			bb_graphics_context.bb_device.DrawSurface2(bbt_image.bb_surface,bbt_x-bbt_image.bb_tx,bbt_y-bbt_image.bb_ty,bbt_f.bb_x,bbt_f.bb_y,bbt_image.bb_width,bbt_image.bb_height);
		}
	}
	return 0;
}
function bb_graphics_Rotate(bbt_angle){
	bb_graphics_Transform(Math.cos((bbt_angle)*D2R),-Math.sin((bbt_angle)*D2R),Math.sin((bbt_angle)*D2R),Math.cos((bbt_angle)*D2R),0.0,0.0);
	return 0;
}
function bb_graphics_Scale(bbt_x,bbt_y){
	bb_graphics_Transform(bbt_x,0.0,0.0,bbt_y,0.0,0.0);
	return 0;
}
function bb_graphics_DrawImage2(bbt_image,bbt_x,bbt_y,bbt_rotation,bbt_scaleX,bbt_scaleY,bbt_frame){
	var bbt_f=bbt_image.bb_frames[bbt_frame];
	bb_graphics_PushMatrix();
	bb_graphics_Translate(bbt_x,bbt_y);
	bb_graphics_Rotate(bbt_rotation);
	bb_graphics_Scale(bbt_scaleX,bbt_scaleY);
	bb_graphics_Translate(-bbt_image.bb_tx,-bbt_image.bb_ty);
	bb_graphics_ValidateMatrix();
	if((bbt_image.bb_flags&65536)!=0){
		bb_graphics_context.bb_device.DrawSurface(bbt_image.bb_surface,0.0,0.0);
	}else{
		bb_graphics_context.bb_device.DrawSurface2(bbt_image.bb_surface,0.0,0.0,bbt_f.bb_x,bbt_f.bb_y,bbt_image.bb_width,bbt_image.bb_height);
	}
	bb_graphics_PopMatrix();
	return 0;
}
function bb_graphics_DrawImageRect(bbt_image,bbt_x,bbt_y,bbt_srcX,bbt_srcY,bbt_srcWidth,bbt_srcHeight,bbt_frame){
	var bbt_f=bbt_image.bb_frames[bbt_frame];
	if((bb_graphics_context.bb_tformed)!=0){
		bb_graphics_PushMatrix();
		bb_graphics_Translate(-bbt_image.bb_tx+bbt_x,-bbt_image.bb_ty+bbt_y);
		bb_graphics_ValidateMatrix();
		bb_graphics_context.bb_device.DrawSurface2(bbt_image.bb_surface,0.0,0.0,bbt_srcX+bbt_f.bb_x,bbt_srcY+bbt_f.bb_y,bbt_srcWidth,bbt_srcHeight);
		bb_graphics_PopMatrix();
	}else{
		bb_graphics_ValidateMatrix();
		bb_graphics_context.bb_device.DrawSurface2(bbt_image.bb_surface,-bbt_image.bb_tx+bbt_x,-bbt_image.bb_ty+bbt_y,bbt_srcX+bbt_f.bb_x,bbt_srcY+bbt_f.bb_y,bbt_srcWidth,bbt_srcHeight);
	}
	return 0;
}
function bb_graphics_DrawImageRect2(bbt_image,bbt_x,bbt_y,bbt_srcX,bbt_srcY,bbt_srcWidth,bbt_srcHeight,bbt_rotation,bbt_scaleX,bbt_scaleY,bbt_frame){
	var bbt_f=bbt_image.bb_frames[bbt_frame];
	bb_graphics_PushMatrix();
	bb_graphics_Translate(bbt_x,bbt_y);
	bb_graphics_Rotate(bbt_rotation);
	bb_graphics_Scale(bbt_scaleX,bbt_scaleY);
	bb_graphics_Translate(-bbt_image.bb_tx,-bbt_image.bb_ty);
	bb_graphics_ValidateMatrix();
	bb_graphics_context.bb_device.DrawSurface2(bbt_image.bb_surface,0.0,0.0,bbt_srcX+bbt_f.bb_x,bbt_srcY+bbt_f.bb_y,bbt_srcWidth,bbt_srcHeight);
	bb_graphics_PopMatrix();
	return 0;
}
function bb_math_Abs(bbt_x){
	if(bbt_x>=0){
		return bbt_x;
	}
	return -bbt_x;
}
function bb_math_Abs2(bbt_x){
	if(bbt_x>=0.0){
		return bbt_x;
	}
	return -bbt_x;
}
function bbInit(){
	bb_graphics_context=null;
	bb_input_device=null;
	bb_audio_device=null;
	bb_app_device=null;
	bb_graphics_DefaultFlags=0;
	bb_graphics_renderDevice=null;
	bb_angelfont_error="";
	bb_angelfont_current=null;
	bb_angelfont__list=bb_map_new2.call(new bb_map_StringMap);
	bb_globals_numTileTypes=12;
	bb_random_Seed=1234;
}
//${TRANSCODE_END}
