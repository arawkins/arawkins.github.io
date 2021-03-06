
//${CONFIG_BEGIN}
CFG_BINARY_FILES="*.bin|*.dat";
CFG_BRL_DATABUFFER_IMPLEMENTED="1";
CFG_BRL_GAMETARGET_IMPLEMENTED="1";
CFG_BRL_THREAD_IMPLEMENTED="1";
CFG_CD="";
CFG_CONFIG="release";
CFG_HOST="linux";
CFG_HTML5_WEBAUDIO_ENABLED="1";
CFG_IMAGE_FILES="*.png|*.jpg";
CFG_LANG="js";
CFG_MODPATH="";
CFG_MOJO_AUTO_SUSPEND_ENABLED="1";
CFG_MOJO_DRIVER_IMPLEMENTED="1";
CFG_MUSIC_FILES="*.wav|*.ogg|*.mp3|*.m4a";
CFG_OPENGL_DEPTH_BUFFER_ENABLED="1";
CFG_OPENGL_GLES20_ENABLED="1";
CFG_SAFEMODE="0";
CFG_SOUND_FILES="*.wav|*.ogg|*.mp3|*.m4a";
CFG_TARGET="html5";
CFG_TEXT_FILES="*.glsl;*.txt|*.xml|*.json";
//${CONFIG_END}

//${METADATA_BEGIN}
var META_DATA="[mojo_font.png];type=image/png;width=864;height=13;\n[mojo2_font.png];type=image/png;width=960;height=16;\n[anna.png];type=image/png;width=194;height=268;\n[butterfly.png];type=image/png;width=32;height=32;\n[elsa.png];type=image/png;width=268;height=268;\n[flower.png];type=image/png;width=32;height=33;\n[princess-big-sister-graphic.jpg];type=image/jpg;width=400;height=400;\n[princess.png];type=image/png;width=160;height=268;\n[rainbow-background-cropped.jpg];type=image/jpg;width=640;height=480;\n[rainbow-background.jpg];type=image/jpg;width=1250;height=781;\n[rainbow-heart.png];type=image/png;width=32;height=32;\n[rainbow-tree.png];type=image/png;width=32;height=47;\n[rapunzel.png];type=image/png;width=268;height=268;\n[snowflake.png];type=image/png;width=32;height=32;\n[snowwhite.png];type=image/png;width=147;height=268;\n[titlescreen.png];type=image/png;width=640;height=480;\n";
//${METADATA_END}

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

var dbg_index=0;

function push_err(){
	err_stack.push( err_info );
}

function pop_err(){
	err_info=err_stack.pop();
}

function stackTrace(){
	if( !err_info.length ) return "";
	var str=err_info+"\n";
	for( var i=err_stack.length-1;i>0;--i ){
		str+=err_stack[i]+"\n";
	}
	return str;
}

function print( str ){
	var cons=document.getElementById( "GameConsole" );
	if( cons ){
		cons.value+=str+"\n";
		cons.scrollTop=cons.scrollHeight-cons.clientHeight;
	}else if( window.console!=undefined ){
		window.console.log( str );
	}
	return 0;
}

function alertError( err ){
	if( typeof(err)=="string" && err=="" ) return;
	alert( "Monkey Runtime Error : "+err.toString()+"\n\n"+stackTrace() );
}

function error( err ){
	throw err;
}

function debugLog( str ){
	if( window.console!=undefined ) window.console.log( str );
}

function debugStop(){
	debugger;	//	error( "STOP" );
}

function dbg_object( obj ){
	if( obj ) return obj;
	error( "Null object access" );
}

function dbg_charCodeAt( str,index ){
	if( index<0 || index>=str.length ) error( "Character index out of range" );
	return str.charCodeAt( index );
}

function dbg_array( arr,index ){
	if( index<0 || index>=arr.length ) error( "Array index out of range" );
	dbg_index=index;
	return arr;
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

function string_startswith( str,substr ){
	return substr.length<=str.length && str.slice(0,substr.length)==substr;
}

function string_endswith( str,substr ){
	return substr.length<=str.length && str.slice(str.length-substr.length,str.length)==substr;
}

function string_tochars( str ){
	var arr=new Array( str.length );
	for( var i=0;i<str.length;++i ) arr[i]=str.charCodeAt(i);
	return arr;
}

function string_fromchars( chars ){
	var str="",i;
	for( i=0;i<chars.length;++i ){
		str+=String.fromCharCode( chars[i] );
	}
	return str;
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

function ThrowableObject(){
}

ThrowableObject.prototype.toString=function(){ 
	return "Uncaught Monkey Exception"; 
}


function BBGameEvent(){}
BBGameEvent.KeyDown=1;
BBGameEvent.KeyUp=2;
BBGameEvent.KeyChar=3;
BBGameEvent.MouseDown=4;
BBGameEvent.MouseUp=5;
BBGameEvent.MouseMove=6;
BBGameEvent.TouchDown=7;
BBGameEvent.TouchUp=8;
BBGameEvent.TouchMove=9;
BBGameEvent.MotionAccel=10;

function BBGameDelegate(){}
BBGameDelegate.prototype.StartGame=function(){}
BBGameDelegate.prototype.SuspendGame=function(){}
BBGameDelegate.prototype.ResumeGame=function(){}
BBGameDelegate.prototype.UpdateGame=function(){}
BBGameDelegate.prototype.RenderGame=function(){}
BBGameDelegate.prototype.KeyEvent=function( ev,data ){}
BBGameDelegate.prototype.MouseEvent=function( ev,data,x,y ){}
BBGameDelegate.prototype.TouchEvent=function( ev,data,x,y ){}
BBGameDelegate.prototype.MotionEvent=function( ev,data,x,y,z ){}
BBGameDelegate.prototype.DiscardGraphics=function(){}

function BBDisplayMode( width,height ){
	this.width=width;
	this.height=height;
}

function BBGame(){
	BBGame._game=this;
	this._delegate=null;
	this._keyboardEnabled=false;
	this._updateRate=0;
	this._started=false;
	this._suspended=false;
	this._debugExs=(CFG_CONFIG=="debug");
	this._startms=Date.now();
}

BBGame.Game=function(){
	return BBGame._game;
}

BBGame.prototype.SetDelegate=function( delegate ){
	this._delegate=delegate;
}

BBGame.prototype.Delegate=function(){
	return this._delegate;
}

BBGame.prototype.SetUpdateRate=function( updateRate ){
	this._updateRate=updateRate;
}

BBGame.prototype.SetKeyboardEnabled=function( keyboardEnabled ){
	this._keyboardEnabled=keyboardEnabled;
}

BBGame.prototype.Started=function(){
	return this._started;
}

BBGame.prototype.Suspended=function(){
	return this._suspended;
}

BBGame.prototype.Millisecs=function(){
	return Date.now()-this._startms;
}

BBGame.prototype.GetDate=function( date ){
	var n=date.length;
	if( n>0 ){
		var t=new Date();
		date[0]=t.getFullYear();
		if( n>1 ){
			date[1]=t.getMonth()+1;
			if( n>2 ){
				date[2]=t.getDate();
				if( n>3 ){
					date[3]=t.getHours();
					if( n>4 ){
						date[4]=t.getMinutes();
						if( n>5 ){
							date[5]=t.getSeconds();
							if( n>6 ){
								date[6]=t.getMilliseconds();
							}
						}
					}
				}
			}
		}
	}
}

BBGame.prototype.SaveState=function( state ){
	localStorage.setItem( "monkeystate@"+document.URL,state );	//key can't start with dot in Chrome!
	return 1;
}

BBGame.prototype.LoadState=function(){
	var state=localStorage.getItem( "monkeystate@"+document.URL );
	if( state ) return state;
	return "";
}

BBGame.prototype.LoadString=function( path ){

	var xhr=new XMLHttpRequest();
	xhr.open( "GET",this.PathToUrl( path ),false );
	
	xhr.send( null );
	
	if( xhr.status==200 || xhr.status==0 ) return xhr.responseText;
	
	return "";
}

BBGame.prototype.PollJoystick=function( port,joyx,joyy,joyz,buttons ){
	return false;
}

BBGame.prototype.OpenUrl=function( url ){
	window.location=url;
}

BBGame.prototype.SetMouseVisible=function( visible ){
	if( visible ){
		this._canvas.style.cursor='default';	
	}else{
		this._canvas.style.cursor="url('data:image/cur;base64,AAACAAEAICAAAAAAAACoEAAAFgAAACgAAAAgAAAAQAAAAAEAIAAAAAAAgBAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA55ZXBgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAOeWVxAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADnllcGAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////9////////////////////+////////f/////////8%3D'), auto";
	}
}

BBGame.prototype.GetDeviceWidth=function(){
	return 0;
}

BBGame.prototype.GetDeviceHeight=function(){
	return 0;
}

BBGame.prototype.SetDeviceWindow=function( width,height,flags ){
}

BBGame.prototype.GetDisplayModes=function(){
	return new Array();
}

BBGame.prototype.GetDesktopMode=function(){
	return null;
}

BBGame.prototype.SetSwapInterval=function( interval ){
}

BBGame.prototype.PathToFilePath=function( path ){
	return "";
}

//***** js Game *****

BBGame.prototype.PathToUrl=function( path ){
	return path;
}

BBGame.prototype.LoadData=function( path ){

	var xhr=new XMLHttpRequest();
	xhr.open( "GET",this.PathToUrl( path ),false );

	if( xhr.overrideMimeType ) xhr.overrideMimeType( "text/plain; charset=x-user-defined" );

	xhr.send( null );
	if( xhr.status!=200 && xhr.status!=0 ) return null;

	var r=xhr.responseText;
	var buf=new ArrayBuffer( r.length );
	var bytes=new Int8Array( buf );
	for( var i=0;i<r.length;++i ){
		bytes[i]=r.charCodeAt( i );
	}
	return buf;
}

//***** INTERNAL ******

BBGame.prototype.Die=function( ex ){

	this._delegate=new BBGameDelegate();
	
	if( !ex.toString() ){
		return;
	}
	
	if( this._debugExs ){
		print( "Monkey Runtime Error : "+ex.toString() );
		print( stackTrace() );
	}
	
	throw ex;
}

BBGame.prototype.StartGame=function(){

	if( this._started ) return;
	this._started=true;
	
	if( this._debugExs ){
		try{
			this._delegate.StartGame();
		}catch( ex ){
			this.Die( ex );
		}
	}else{
		this._delegate.StartGame();
	}
}

BBGame.prototype.SuspendGame=function(){

	if( !this._started || this._suspended ) return;
	this._suspended=true;
	
	if( this._debugExs ){
		try{
			this._delegate.SuspendGame();
		}catch( ex ){
			this.Die( ex );
		}
	}else{
		this._delegate.SuspendGame();
	}
}

BBGame.prototype.ResumeGame=function(){

	if( !this._started || !this._suspended ) return;
	this._suspended=false;
	
	if( this._debugExs ){
		try{
			this._delegate.ResumeGame();
		}catch( ex ){
			this.Die( ex );
		}
	}else{
		this._delegate.ResumeGame();
	}
}

BBGame.prototype.UpdateGame=function(){

	if( !this._started || this._suspended ) return;

	if( this._debugExs ){
		try{
			this._delegate.UpdateGame();
		}catch( ex ){
			this.Die( ex );
		}	
	}else{
		this._delegate.UpdateGame();
	}
}

BBGame.prototype.RenderGame=function(){

	if( !this._started ) return;
	
	if( this._debugExs ){
		try{
			this._delegate.RenderGame();
		}catch( ex ){
			this.Die( ex );
		}	
	}else{
		this._delegate.RenderGame();
	}
}

BBGame.prototype.KeyEvent=function( ev,data ){

	if( !this._started ) return;
	
	if( this._debugExs ){
		try{
			this._delegate.KeyEvent( ev,data );
		}catch( ex ){
			this.Die( ex );
		}
	}else{
		this._delegate.KeyEvent( ev,data );
	}
}

BBGame.prototype.MouseEvent=function( ev,data,x,y ){

	if( !this._started ) return;
	
	if( this._debugExs ){
		try{
			this._delegate.MouseEvent( ev,data,x,y );
		}catch( ex ){
			this.Die( ex );
		}
	}else{
		this._delegate.MouseEvent( ev,data,x,y );
	}
}

BBGame.prototype.TouchEvent=function( ev,data,x,y ){

	if( !this._started ) return;
	
	if( this._debugExs ){
		try{
			this._delegate.TouchEvent( ev,data,x,y );
		}catch( ex ){
			this.Die( ex );
		}
	}else{
		this._delegate.TouchEvent( ev,data,x,y );
	}
}

BBGame.prototype.MotionEvent=function( ev,data,x,y,z ){

	if( !this._started ) return;
	
	if( this._debugExs ){
		try{
			this._delegate.MotionEvent( ev,data,x,y,z );
		}catch( ex ){
			this.Die( ex );
		}
	}else{
		this._delegate.MotionEvent( ev,data,x,y,z );
	}
}

BBGame.prototype.DiscardGraphics=function(){

	if( !this._started ) return;
	
	if( this._debugExs ){
		try{
			this._delegate.DiscardGraphics();
		}catch( ex ){
			this.Die( ex );
		}
	}else{
		this._delegate.DiscardGraphics();
	}
}


var webglGraphicsSeq=1;

function BBHtml5Game( canvas ){

	BBGame.call( this );
	BBHtml5Game._game=this;
	this._canvas=canvas;
	this._loading=0;
	this._timerSeq=0;
	this._gl=null;
	
	if( CFG_OPENGL_GLES20_ENABLED=="1" ){

		//can't get these to fire!
		canvas.addEventListener( "webglcontextlost",function( event ){
			event.preventDefault();
//			print( "WebGL context lost!" );
		},false );

		canvas.addEventListener( "webglcontextrestored",function( event ){
			++webglGraphicsSeq;
//			print( "WebGL context restored!" );
		},false );

		var attrs={ alpha:false };
	
		this._gl=this._canvas.getContext( "webgl",attrs );

		if( !this._gl ) this._gl=this._canvas.getContext( "experimental-webgl",attrs );
		
		if( !this._gl ) this.Die( "Can't create WebGL" );
		
		gl=this._gl;
		
		
		
	}
	
	// --- start gamepad api by skn3 ---------
	this._gamepads = null;
	this._gamepadLookup = [-1,-1,-1,-1];//support 4 gamepads
	var that = this;
	window.addEventListener("gamepadconnected", function(e) {
		that.connectGamepad(e.gamepad);
	});
	
	window.addEventListener("gamepaddisconnected", function(e) {
		that.disconnectGamepad(e.gamepad);
	});
	
	//need to process already connected gamepads (before page was loaded)
	var gamepads = this.getGamepads();
	if (gamepads && gamepads.length > 0) {
		for(var index=0;index < gamepads.length;index++) {
			this.connectGamepad(gamepads[index]);
		}
	}
	// --- end gamepad api by skn3 ---------
}

BBHtml5Game.prototype=extend_class( BBGame );

BBHtml5Game.Html5Game=function(){
	return BBHtml5Game._game;
}

// --- start gamepad api by skn3 ---------
BBHtml5Game.prototype.getGamepads = function() {
	return navigator.getGamepads ? navigator.getGamepads() : (navigator.webkitGetGamepads ? navigator.webkitGetGamepads : []);
}

BBHtml5Game.prototype.connectGamepad = function(gamepad) {
	if (!gamepad) {
		return false;
	}
	
	//check if this is a standard gamepad
	if (gamepad.mapping == "standard") {
		//yup so lets add it to an array of valid gamepads
		//find empty controller slot
		var slot = -1;
		for(var index = 0;index < this._gamepadLookup.length;index++) {
			if (this._gamepadLookup[index] == -1) {
				slot = index;
				break;
			}
		}
		
		//can we add this?
		if (slot != -1) {
			this._gamepadLookup[slot] = gamepad.index;
			
			//console.log("gamepad at html5 index "+gamepad.index+" mapped to monkey gamepad unit "+slot);
		}
	} else {
		console.log('Monkey has ignored gamepad at raw port #'+gamepad.index+' with unrecognised mapping scheme \''+gamepad.mapping+'\'.');
	}
}

BBHtml5Game.prototype.disconnectGamepad = function(gamepad) {
	if (!gamepad) {
		return false;
	}
	
	//scan all gamepads for matching index
	for(var index = 0;index < this._gamepadLookup.length;index++) {
		if (this._gamepadLookup[index] == gamepad.index) {
			//remove this gamepad
			this._gamepadLookup[index] = -1
			break;
		}
	}
}

BBHtml5Game.prototype.PollJoystick=function(port, joyx, joyy, joyz, buttons){
	//is this the first gamepad being polled
	if (port == 0) {
		//yes it is so we use the web api to get all gamepad info
		//we can then use this in subsequent calls to PollJoystick
		this._gamepads = this.getGamepads();
	}
	
	//dont bother processing if nothing to process
	if (!this._gamepads) {
	  return false;
	}
	
	//so use the monkey port to find the correct raw data
	var index = this._gamepadLookup[port];
	if (index == -1) {
		return false;
	}

	var gamepad = this._gamepads[index];
	if (!gamepad) {
		return false;
	}
	//so now process gamepad axis/buttons according to the standard mappings
	//https://w3c.github.io/gamepad/#remapping
	
	//left stick axis
	joyx[0] = gamepad.axes[0];
	joyy[0] = -gamepad.axes[1];
	
	//right stick axis
	joyx[1] = gamepad.axes[2];
	joyy[1] = -gamepad.axes[3];
	
	//triggers
	//emulate same functionality of GLFW
	joyz[0] = gamepad.buttons[6].value;
	joyz[1] = gamepad.buttons[7].value;
	
	//clear button states
	for(var index = 0;index <32;index++) {
		buttons[index] = false;
	}
	
	//map html5 "standard" mapping to monkeys joy codes
	/*
	Const JOY_A=0
	Const JOY_B=1
	Const JOY_X=2
	Const JOY_Y=3
	Const JOY_LB=4
	Const JOY_RB=5
	Const JOY_BACK=6
	Const JOY_START=7
	Const JOY_LEFT=8
	Const JOY_UP=9
	Const JOY_RIGHT=10
	Const JOY_DOWN=11
	Const JOY_LSB=12
	Const JOY_RSB=13
	Const JOY_MENU=14
	*/
	buttons[0] = gamepad.buttons[0] && gamepad.buttons[0].pressed;
	buttons[1] = gamepad.buttons[1] && gamepad.buttons[1].pressed;
	buttons[2] = gamepad.buttons[2] && gamepad.buttons[2].pressed;
	buttons[3] = gamepad.buttons[3] && gamepad.buttons[3].pressed;
	buttons[4] = gamepad.buttons[4] && gamepad.buttons[4].pressed;
	buttons[5] = gamepad.buttons[5] && gamepad.buttons[5].pressed;
	buttons[6] = gamepad.buttons[8] && gamepad.buttons[8].pressed;
	buttons[7] = gamepad.buttons[9] && gamepad.buttons[9].pressed;
	buttons[8] = gamepad.buttons[14] && gamepad.buttons[14].pressed;
	buttons[9] = gamepad.buttons[12] && gamepad.buttons[12].pressed;
	buttons[10] = gamepad.buttons[15] && gamepad.buttons[15].pressed;
	buttons[11] = gamepad.buttons[13] && gamepad.buttons[13].pressed;
	buttons[12] = gamepad.buttons[10] && gamepad.buttons[10].pressed;
	buttons[13] = gamepad.buttons[11] && gamepad.buttons[11].pressed;
	buttons[14] = gamepad.buttons[16] && gamepad.buttons[16].pressed;
	
	//success
	return true
}
// --- end gamepad api by skn3 ---------

BBHtml5Game.prototype.ValidateUpdateTimer=function(){

	++this._timerSeq;
	if( this._suspended ) return;
	
	var game=this;
	var seq=game._timerSeq;
	
	var maxUpdates=4;
	var updateRate=this._updateRate;
	
	if( !updateRate ){

		var reqAnimFrame=(window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame);
	
		if( reqAnimFrame ){
			function animate(){
				if( seq!=game._timerSeq ) return;
	
				game.UpdateGame();
				if( seq!=game._timerSeq ) return;
	
				reqAnimFrame( animate );
				game.RenderGame();
			}
			reqAnimFrame( animate );
			return;
		}
		
		maxUpdates=1;
		updateRate=60;
	}
	
	var updatePeriod=1000.0/updateRate;
	var nextUpdate=0;

	function timeElapsed(){
		if( seq!=game._timerSeq ) return;
		
		if( !nextUpdate ) nextUpdate=Date.now();
		
		for( var i=0;i<maxUpdates;++i ){
		
			game.UpdateGame();
			if( seq!=game._timerSeq ) return;
			
			nextUpdate+=updatePeriod;
			var delay=nextUpdate-Date.now();
			
			if( delay>0 ){
				setTimeout( timeElapsed,delay );
				game.RenderGame();
				return;
			}
		}
		nextUpdate=0;
		setTimeout( timeElapsed,0 );
		game.RenderGame();
	}

	setTimeout( timeElapsed,0 );
}

//***** BBGame methods *****

BBHtml5Game.prototype.SetUpdateRate=function( updateRate ){

	BBGame.prototype.SetUpdateRate.call( this,updateRate );
	
	this.ValidateUpdateTimer();
}

BBHtml5Game.prototype.GetMetaData=function( path,key ){
	if( path.indexOf( "monkey://data/" )!=0 ) return "";
	path=path.slice(14);

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

BBHtml5Game.prototype.PathToUrl=function( path ){
	if( path.indexOf( "monkey:" )!=0 ){
		return path;
	}else if( path.indexOf( "monkey://data/" )==0 ) {
		return "data/"+path.slice( 14 );
	}
	return "";
}

BBHtml5Game.prototype.GetLoading=function(){
	return this._loading;
}

BBHtml5Game.prototype.IncLoading=function(){
	++this._loading;
	return this._loading;
}

BBHtml5Game.prototype.DecLoading=function(){
	--this._loading;
	return this._loading;
}

BBHtml5Game.prototype.GetCanvas=function(){
	return this._canvas;
}

BBHtml5Game.prototype.GetWebGL=function(){
	return this._gl;
}

BBHtml5Game.prototype.GetDeviceWidth=function(){
	return this._canvas.width;
}

BBHtml5Game.prototype.GetDeviceHeight=function(){
	return this._canvas.height;
}

//***** INTERNAL *****

BBHtml5Game.prototype.UpdateGame=function(){

	if( !this._loading ) BBGame.prototype.UpdateGame.call( this );
}

BBHtml5Game.prototype.SuspendGame=function(){

	BBGame.prototype.SuspendGame.call( this );
	
	BBGame.prototype.RenderGame.call( this );
	
	this.ValidateUpdateTimer();
}

BBHtml5Game.prototype.ResumeGame=function(){

	BBGame.prototype.ResumeGame.call( this );
	
	this.ValidateUpdateTimer();
}

BBHtml5Game.prototype.Run=function(){

	var game=this;
	var canvas=game._canvas;
	
	var xscale=1;
	var yscale=1;
	
	var touchIds=new Array( 32 );
	for( i=0;i<32;++i ) touchIds[i]=-1;
	
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
		case 8:case 9:case 13:case 27:case 32:return key;
		case 33:case 34:case 35:case 36:case 37:case 38:case 39:case 40:case 45:return key|0x10000;
		case 46:return 127;
		}
		return 0;
	}
	
	function mouseX( e ){
		var x=e.clientX+document.body.scrollLeft;
		var c=canvas;
		while( c ){
			x-=c.offsetLeft;
			c=c.offsetParent;
		}
		return x*xscale;
	}
	
	function mouseY( e ){
		var y=e.clientY+document.body.scrollTop;
		var c=canvas;
		while( c ){
			y-=c.offsetTop;
			c=c.offsetParent;
		}
		return y*yscale;
	}

	function touchX( touch ){
		var x=touch.pageX;
		var c=canvas;
		while( c ){
			x-=c.offsetLeft;
			c=c.offsetParent;
		}
		return x;
	}			
	
	function touchY( touch ){
		var y=touch.pageY;
		var c=canvas;
		while( c ){
			y-=c.offsetTop;
			c=c.offsetParent;
		}
		return y;
	}
	
	canvas.onkeydown=function( e ){
		game.KeyEvent( BBGameEvent.KeyDown,e.keyCode );
		var chr=keyToChar( e.keyCode );
		if( chr ) game.KeyEvent( BBGameEvent.KeyChar,chr );
		if( e.keyCode<48 || (e.keyCode>111 && e.keyCode<122) ) eatEvent( e );
	}

	canvas.onkeyup=function( e ){
		game.KeyEvent( BBGameEvent.KeyUp,e.keyCode );
	}

	canvas.onkeypress=function( e ){
		if( e.charCode ){
			game.KeyEvent( BBGameEvent.KeyChar,e.charCode );
		}else if( e.which ){
			game.KeyEvent( BBGameEvent.KeyChar,e.which );
		}
	}

	canvas.onmousedown=function( e ){
		switch( e.button ){
		case 0:game.MouseEvent( BBGameEvent.MouseDown,0,mouseX(e),mouseY(e) );break;
		case 1:game.MouseEvent( BBGameEvent.MouseDown,2,mouseX(e),mouseY(e) );break;
		case 2:game.MouseEvent( BBGameEvent.MouseDown,1,mouseX(e),mouseY(e) );break;
		}
		eatEvent( e );
	}
	
	canvas.onmouseup=function( e ){
		switch( e.button ){
		case 0:game.MouseEvent( BBGameEvent.MouseUp,0,mouseX(e),mouseY(e) );break;
		case 1:game.MouseEvent( BBGameEvent.MouseUp,2,mouseX(e),mouseY(e) );break;
		case 2:game.MouseEvent( BBGameEvent.MouseUp,1,mouseX(e),mouseY(e) );break;
		}
		eatEvent( e );
	}
	
	canvas.onmousemove=function( e ){
		game.MouseEvent( BBGameEvent.MouseMove,-1,mouseX(e),mouseY(e) );
		eatEvent( e );
	}

	canvas.onmouseout=function( e ){
		game.MouseEvent( BBGameEvent.MouseUp,0,mouseX(e),mouseY(e) );
		game.MouseEvent( BBGameEvent.MouseUp,1,mouseX(e),mouseY(e) );
		game.MouseEvent( BBGameEvent.MouseUp,2,mouseX(e),mouseY(e) );
		eatEvent( e );
	}
	
	canvas.onclick=function( e ){
		if( game.Suspended() ){
			canvas.focus();
		}
		eatEvent( e );
		return;
	}
	
	canvas.oncontextmenu=function( e ){
		return false;
	}
	
	canvas.ontouchstart=function( e ){
		if( game.Suspended() ){
			canvas.focus();
		}
		for( var i=0;i<e.changedTouches.length;++i ){
			var touch=e.changedTouches[i];
			for( var j=0;j<32;++j ){
				if( touchIds[j]!=-1 ) continue;
				touchIds[j]=touch.identifier;
				game.TouchEvent( BBGameEvent.TouchDown,j,touchX(touch),touchY(touch) );
				break;
			}
		}
		eatEvent( e );
	}
	
	canvas.ontouchmove=function( e ){
		for( var i=0;i<e.changedTouches.length;++i ){
			var touch=e.changedTouches[i];
			for( var j=0;j<32;++j ){
				if( touchIds[j]!=touch.identifier ) continue;
				game.TouchEvent( BBGameEvent.TouchMove,j,touchX(touch),touchY(touch) );
				break;
			}
		}
		eatEvent( e );
	}
	
	canvas.ontouchend=function( e ){
		for( var i=0;i<e.changedTouches.length;++i ){
			var touch=e.changedTouches[i];
			for( var j=0;j<32;++j ){
				if( touchIds[j]!=touch.identifier ) continue;
				touchIds[j]=-1;
				game.TouchEvent( BBGameEvent.TouchUp,j,touchX(touch),touchY(touch) );
				break;
			}
		}
		eatEvent( e );
	}
	
	window.ondevicemotion=function( e ){
		var tx=e.accelerationIncludingGravity.x/9.81;
		var ty=e.accelerationIncludingGravity.y/9.81;
		var tz=e.accelerationIncludingGravity.z/9.81;
		var x,y;
		switch( window.orientation ){
		case   0:x=+tx;y=-ty;break;
		case 180:x=-tx;y=+ty;break;
		case  90:x=-ty;y=-tx;break;
		case -90:x=+ty;y=+tx;break;
		}
		game.MotionEvent( BBGameEvent.MotionAccel,0,x,y,tz );
		eatEvent( e );
	}

	canvas.onfocus=function( e ){
		if( CFG_MOJO_AUTO_SUSPEND_ENABLED=="1" ){
			game.ResumeGame();
		}
	}
	
	canvas.onblur=function( e ){
		for( var i=0;i<256;++i ) game.KeyEvent( BBGameEvent.KeyUp,i );
		if( CFG_MOJO_AUTO_SUSPEND_ENABLED=="1" ){
			game.SuspendGame();
		}
	}
	
	canvas.updateSize=function(){
		xscale=canvas.width/canvas.clientWidth;
		yscale=canvas.height/canvas.clientHeight;
		game.RenderGame();
	}
	
	canvas.updateSize();
	
	canvas.focus();
	
	game.StartGame();

	game.RenderGame();
}


function BBMonkeyGame( canvas ){
	BBHtml5Game.call( this,canvas );
}

BBMonkeyGame.prototype=extend_class( BBHtml5Game );

BBMonkeyGame.Main=function( canvas ){

	var game=new BBMonkeyGame( canvas );

	try{

		bbInit();
		bbMain();

	}catch( ex ){
	
		game.Die( ex );
		return;
	}

	if( !game.Delegate() ) return;
	
	game.Run();
}


// HTML5 mojo runtime.
//
// Copyright 2011 Mark Sibly, all rights reserved.
// No warranty implied; use at your own risk.

// ***** gxtkGraphics class *****

function gxtkGraphics(){
	this.game=BBHtml5Game.Html5Game();
	this.canvas=this.game.GetCanvas()
	this.width=this.canvas.width;
	this.height=this.canvas.height;
	this.gl=null;
	this.gc=this.canvas.getContext( '2d' );
	this.tmpCanvas=null;
	this.r=255;
	this.b=255;
	this.g=255;
	this.white=true;
	this.color="rgb(255,255,255)"
	this.alpha=1;
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
	this.width=this.canvas.width;
	this.height=this.canvas.height;
	if( !this.gc ) return 0;
	this.gc.save();
	if( this.game.GetLoading() ) return 2;
	return 1;
}

gxtkGraphics.prototype.EndRender=function(){
	if( this.gc ) this.gc.restore();
}

gxtkGraphics.prototype.Width=function(){
	return this.width;
}

gxtkGraphics.prototype.Height=function(){
	return this.height;
}

gxtkGraphics.prototype.LoadSurface=function( path ){
	var game=this.game;

	var ty=game.GetMetaData( path,"type" );
	if( ty.indexOf( "image/" )!=0 ) return null;
	
	game.IncLoading();

	var image=new Image();
	image.onload=function(){ game.DecLoading(); }
	image.onerror=function(){ game.DecLoading(); }
	image.meta_width=parseInt( game.GetMetaData( path,"width" ) );
	image.meta_height=parseInt( game.GetMetaData( path,"height" ) );
	image.src=game.PathToUrl( path );

	return new gxtkSurface( image,this );
}

gxtkGraphics.prototype.CreateSurface=function( width,height ){
	var canvas=document.createElement( 'canvas' );
	
	canvas.width=width;
	canvas.height=height;
	canvas.meta_width=width;
	canvas.meta_height=height;
	canvas.complete=true;
	
	var surface=new gxtkSurface( canvas,this );
	
	surface.gc=canvas.getContext( '2d' );
	
	return surface;
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
	this.gc.globalAlpha=this.alpha;	
	this.gc.globalCompositeOperation=this.blend;
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

gxtkGraphics.prototype.DrawPoint=function( x,y ){
	if( this.tformed ){
		var px=x;
		x=px * this.ix + y * this.jx + this.tx;
		y=px * this.iy + y * this.jy + this.ty;
		this.gc.setTransform( 1,0,0,1,0,0 );
		this.gc.fillRect( x,y,1,1 );
		this.gc.setTransform( this.ix,this.iy,this.jx,this.jy,this.tx,this.ty );
	}else{
		this.gc.fillRect( x,y,1,1 );
	}
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
	if( verts.length<2 ) return;
	this.gc.beginPath();
	this.gc.moveTo( verts[0],verts[1] );
	for( var i=2;i<verts.length;i+=2 ){
		this.gc.lineTo( verts[i],verts[i+1] );
	}
	this.gc.fill();
	this.gc.closePath();
}

gxtkGraphics.prototype.DrawPoly2=function( verts,surface,srx,srcy ){
	if( verts.length<4 ) return;
	this.gc.beginPath();
	this.gc.moveTo( verts[0],verts[1] );
	for( var i=4;i<verts.length;i+=4 ){
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
	
	var tmpGC=this.tmpCanvas.getContext( "2d" );
	tmpGC.globalCompositeOperation="copy";
	
	tmpGC.drawImage( image,sx,sy,sw,sh,0,0,sw,sh );
	
	var imgData=tmpGC.getImageData( 0,0,sw,sh );
	
	var p=imgData.data,sz=sw*sh*4,i;
	
	for( i=0;i<sz;i+=4 ){
		p[i]=p[i]*this.r/255;
		p[i+1]=p[i+1]*this.g/255;
		p[i+2]=p[i+2]*this.b/255;
	}
	
	tmpGC.putImageData( imgData,0,0 );
	
	this.gc.drawImage( this.tmpCanvas,0,0,sw,sh,dx,dy,sw,sh );
}

gxtkGraphics.prototype.ReadPixels=function( pixels,x,y,width,height,offset,pitch ){

	var imgData=this.gc.getImageData( x,y,width,height );
	
	var p=imgData.data,i=0,j=offset,px,py;
	
	for( py=0;py<height;++py ){
		for( px=0;px<width;++px ){
			pixels[j++]=(p[i+3]<<24)|(p[i]<<16)|(p[i+1]<<8)|p[i+2];
			i+=4;
		}
		j+=pitch-width;
	}
}

gxtkGraphics.prototype.WritePixels2=function( surface,pixels,x,y,width,height,offset,pitch ){

	if( !surface.gc ){
		if( !surface.image.complete ) return;
		var canvas=document.createElement( "canvas" );
		canvas.width=surface.swidth;
		canvas.height=surface.sheight;
		surface.gc=canvas.getContext( "2d" );
		surface.gc.globalCompositeOperation="copy";
		surface.gc.drawImage( surface.image,0,0 );
		surface.image=canvas;
	}

	var imgData=surface.gc.createImageData( width,height );

	var p=imgData.data,i=0,j=offset,px,py,argb;
	
	for( py=0;py<height;++py ){
		for( px=0;px<width;++px ){
			argb=pixels[j++];
			p[i]=(argb>>16) & 0xff;
			p[i+1]=(argb>>8) & 0xff;
			p[i+2]=argb & 0xff;
			p[i+3]=(argb>>24) & 0xff;
			i+=4;
		}
		j+=pitch-width;
	}
	
	surface.gc.putImageData( imgData,x,y );
}

// ***** gxtkSurface class *****

function gxtkSurface( image,graphics ){
	this.image=image;
	this.graphics=graphics;
	this.swidth=image.meta_width;
	this.sheight=image.meta_height;
}

// ***** GXTK API *****

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

gxtkSurface.prototype.OnUnsafeLoadComplete=function(){
}

if( CFG_HTML5_WEBAUDIO_ENABLED=="1" && (window.AudioContext || window.webkitAudioContext) ){

//print( "Using WebAudio!" );

// ***** WebAudio *****

var wa=null;

// ***** WebAudio gxtkSample *****

var gxtkSample=function(){
	this.waBuffer=null;
	this.state=0;
}

gxtkSample.prototype.Load=function( path ){
	if( this.state ) return false;

	var req=new XMLHttpRequest();
	
	req.open( "get",BBGame.Game().PathToUrl( path ),true );
	req.responseType="arraybuffer";
	
	var abuf=this;
	
	req.onload=function(){
		wa.decodeAudioData( req.response,function( buffer ){
			//success!
			abuf.waBuffer=buffer;
			abuf.state=1;
		},function(){
			abuf.state=-1;
		} );
	}
	
	req.onerror=function(){
		abuf.state=-1;
	}
	
	req.send();
	
	this.state=2;
			
	return true;
}

gxtkSample.prototype.Discard=function(){
}

// ***** WebAudio gxtkChannel *****

var gxtkChannel=function(){
	this.buffer=null;
	this.flags=0;
	this.volume=1;
	this.pan=0;
	this.rate=1;
	this.waSource=null;
	this.waPan=wa.create
	this.waGain=wa.createGain();
	this.waGain.connect( wa.destination );
	this.waPanner=wa.createPanner();
	this.waPanner.rolloffFactor=0;
	this.waPanner.panningModel="equalpower";
	this.waPanner.connect( this.waGain );
	this.startTime=0;
	this.offset=0;
	this.state=0;
}

// ***** WebAudio gxtkAudio *****

var gxtkAudio=function(){

	if( !wa ){
		window.AudioContext=window.AudioContext || window.webkitAudioContext;
		wa=new AudioContext();
	}
	
	this.okay=true;
	this.music=null;
	this.musicState=0;
	this.musicVolume=1;
	this.channels=new Array();
	for( var i=0;i<32;++i ){
		this.channels[i]=new gxtkChannel();
	}
}

gxtkAudio.prototype.Suspend=function(){
	if( this.MusicState()==1 ) this.music.pause();
	for( var i=0;i<32;++i ){
		var chan=this.channels[i];
		if( chan.state!=1 ) continue;
		this.PauseChannel( i );
		chan.state=5;
	}
}

gxtkAudio.prototype.Resume=function(){
	if( this.MusicState()==1 ) this.music.play();
	for( var i=0;i<32;++i ){
		var chan=this.channels[i];
		if( chan.state!=5 ) continue;
		chan.state=2;
		this.ResumeChannel( i );
	}
}

gxtkAudio.prototype.LoadSample=function( path ){

	var sample=new gxtkSample();
	if( !sample.Load( BBHtml5Game.Html5Game().PathToUrl( path ) ) ) return null;
	
	return sample;
}

gxtkAudio.prototype.PlaySample=function( buffer,channel,flags ){

	if( buffer.state!=1 ) return;

	var chan=this.channels[channel];
	
	if( chan.state ){
		chan.waSource.onended=null
		chan.waSource.stop( 0 );
	}
	
	chan.buffer=buffer;
	chan.flags=flags;

	chan.waSource=wa.createBufferSource();
	chan.waSource.buffer=buffer.waBuffer;
	chan.waSource.playbackRate.value=chan.rate;
	chan.waSource.loop=(flags&1)!=0;
	chan.waSource.connect( chan.waPanner );
	
	chan.waSource.onended=function( e ){
		chan.waSource=null;
		chan.state=0;
	}

	chan.offset=0;	
	chan.startTime=wa.currentTime;
	chan.waSource.start( 0 );

	chan.state=1;
}

gxtkAudio.prototype.StopChannel=function( channel ){

	var chan=this.channels[channel];
	if( !chan.state ) return;
	
	if( chan.state==1 ){
		chan.waSource.onended=null;
		chan.waSource.stop( 0 );
		chan.waSource=null;
	}

	chan.state=0;
}

gxtkAudio.prototype.PauseChannel=function( channel ){

	var chan=this.channels[channel];
	if( chan.state!=1 ) return;
	
	chan.offset=(chan.offset+(wa.currentTime-chan.startTime)*chan.rate)%chan.buffer.waBuffer.duration;
	
	chan.waSource.onended=null;
	chan.waSource.stop( 0 );
	chan.waSource=null;
	
	chan.state=2;
}

gxtkAudio.prototype.ResumeChannel=function( channel ){

	var chan=this.channels[channel];
	if( chan.state!=2 ) return;
	
	chan.waSource=wa.createBufferSource();
	chan.waSource.buffer=chan.buffer.waBuffer;
	chan.waSource.playbackRate.value=chan.rate;
	chan.waSource.loop=(chan.flags&1)!=0;
	chan.waSource.connect( chan.waPanner );
	
	chan.waSource.onended=function( e ){
		chan.waSource=null;
		chan.state=0;
	}
	
	chan.startTime=wa.currentTime;
	chan.waSource.start( 0,chan.offset );

	chan.state=1;
}

gxtkAudio.prototype.ChannelState=function( channel ){
	return this.channels[channel].state & 3;
}

gxtkAudio.prototype.SetVolume=function( channel,volume ){
	var chan=this.channels[channel];

	chan.volume=volume;
	
	chan.waGain.gain.value=volume;
}

gxtkAudio.prototype.SetPan=function( channel,pan ){
	var chan=this.channels[channel];

	chan.pan=pan;
	
	var sin=Math.sin( pan*3.14159265359/2 );
	var cos=Math.cos( pan*3.14159265359/2 );
	
	chan.waPanner.setPosition( sin,0,-cos );
}

gxtkAudio.prototype.SetRate=function( channel,rate ){

	var chan=this.channels[channel];

	if( chan.state==1 ){
		//update offset for pause/resume
		var time=wa.currentTime;
		chan.offset=(chan.offset+(time-chan.startTime)*chan.rate)%chan.buffer.waBuffer.duration;
		chan.startTime=time;
	}

	chan.rate=rate;
	
	if( chan.waSource ) chan.waSource.playbackRate.value=rate;
}

gxtkAudio.prototype.PlayMusic=function( path,flags ){
	if( this.musicState ) this.music.pause();
	this.music=new Audio( BBGame.Game().PathToUrl( path ) );
	this.music.loop=(flags&1)!=0;
	this.music.play();
	this.musicState=1;
}

gxtkAudio.prototype.StopMusic=function(){
	if( !this.musicState ) return;
	this.music.pause();
	this.music=null;
	this.musicState=0;
}

gxtkAudio.prototype.PauseMusic=function(){
	if( this.musicState!=1 ) return;
	this.music.pause();
	this.musicState=2;
}

gxtkAudio.prototype.ResumeMusic=function(){
	if( this.musicState!=2 ) return;
	this.music.play();
	this.musicState=1;
}

gxtkAudio.prototype.MusicState=function(){
	if( this.musicState==1 && this.music.ended && !this.music.loop ){
		this.music=null;
		this.musicState=0;
	}
	return this.musicState;
}

gxtkAudio.prototype.SetMusicVolume=function( volume ){
	this.musicVolume=volume;
	if( this.musicState ) this.music.volume=volume;
}

}else{

//print( "Using OldAudio!" );

// ***** gxtkChannel class *****

var gxtkChannel=function(){
	this.sample=null;
	this.audio=null;
	this.volume=1;
	this.pan=0;
	this.rate=1;
	this.flags=0;
	this.state=0;
}

// ***** gxtkAudio class *****

var gxtkAudio=function(){
	this.game=BBHtml5Game.Html5Game();
	this.okay=typeof(Audio)!="undefined";
	this.music=null;
	this.channels=new Array(33);
	for( var i=0;i<33;++i ){
		this.channels[i]=new gxtkChannel();
		if( !this.okay ) this.channels[i].state=-1;
	}
}

gxtkAudio.prototype.Suspend=function(){
	var i;
	for( i=0;i<33;++i ){
		var chan=this.channels[i];
		if( chan.state==1 ){
			if( chan.audio.ended && !chan.audio.loop ){
				chan.state=0;
			}else{
				chan.audio.pause();
				chan.state=3;
			}
		}
	}
}

gxtkAudio.prototype.Resume=function(){
	var i;
	for( i=0;i<33;++i ){
		var chan=this.channels[i];
		if( chan.state==3 ){
			chan.audio.play();
			chan.state=1;
		}
	}
}

gxtkAudio.prototype.LoadSample=function( path ){
	if( !this.okay ) return null;

	var audio=new Audio( this.game.PathToUrl( path ) );
	if( !audio ) return null;
	
	return new gxtkSample( audio );
}

gxtkAudio.prototype.PlaySample=function( sample,channel,flags ){
	if( !this.okay ) return;
	
	var chan=this.channels[channel];

	if( chan.state>0 ){
		chan.audio.pause();
		chan.state=0;
	}
	
	for( var i=0;i<33;++i ){
		var chan2=this.channels[i];
		if( chan2.state==1 && chan2.audio.ended && !chan2.audio.loop ) chan.state=0;
		if( chan2.state==0 && chan2.sample ){
			chan2.sample.FreeAudio( chan2.audio );
			chan2.sample=null;
			chan2.audio=null;
		}
	}

	var audio=sample.AllocAudio();
	if( !audio ) return;

	audio.loop=(flags&1)!=0;
	audio.volume=chan.volume;
	audio.play();

	chan.sample=sample;
	chan.audio=audio;
	chan.flags=flags;
	chan.state=1;
}

gxtkAudio.prototype.StopChannel=function( channel ){
	var chan=this.channels[channel];
	
	if( chan.state>0 ){
		chan.audio.pause();
		chan.state=0;
	}
}

gxtkAudio.prototype.PauseChannel=function( channel ){
	var chan=this.channels[channel];
	
	if( chan.state==1 ){
		if( chan.audio.ended && !chan.audio.loop ){
			chan.state=0;
		}else{
			chan.audio.pause();
			chan.state=2;
		}
	}
}

gxtkAudio.prototype.ResumeChannel=function( channel ){
	var chan=this.channels[channel];
	
	if( chan.state==2 ){
		chan.audio.play();
		chan.state=1;
	}
}

gxtkAudio.prototype.ChannelState=function( channel ){
	var chan=this.channels[channel];
	if( chan.state==1 && chan.audio.ended && !chan.audio.loop ) chan.state=0;
	if( chan.state==3 ) return 1;
	return chan.state;
}

gxtkAudio.prototype.SetVolume=function( channel,volume ){
	var chan=this.channels[channel];
	if( chan.state>0 ) chan.audio.volume=volume;
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

gxtkAudio.prototype.PauseMusic=function(){
	this.PauseChannel( 32 );
}

gxtkAudio.prototype.ResumeMusic=function(){
	this.ResumeChannel( 32 );
}

gxtkAudio.prototype.MusicState=function(){
	return this.ChannelState( 32 );
}

gxtkAudio.prototype.SetMusicVolume=function( volume ){
	this.SetVolume( 32,volume );
}

// ***** gxtkSample class *****

//function gxtkSample( audio ){
var gxtkSample=function( audio ){
	this.audio=audio;
	this.free=new Array();
	this.insts=new Array();
}

gxtkSample.prototype.FreeAudio=function( audio ){
	this.free.push( audio );
}

gxtkSample.prototype.AllocAudio=function(){
	var audio;
	while( this.free.length ){
		audio=this.free.pop();
		try{
			audio.currentTime=0;
			return audio;
		}catch( ex ){
//			print( "AUDIO ERROR1!" );
		}
	}
	
	//Max out?
	if( this.insts.length==8 ) return null;
	
	audio=new Audio( this.audio.src );
	
	//yucky loop handler for firefox!
	//
	audio.addEventListener( 'ended',function(){
		if( this.loop ){
			try{
				this.currentTime=0;
				this.play();
			}catch( ex ){
//				print( "AUDIO ERROR2!" );
			}
		}
	},false );

	this.insts.push( audio );
	return audio;
}

gxtkSample.prototype.Discard=function(){
}

}


function BBThread(){
	this.result=null;
	this.running=false;
}

BBThread.prototype.Start=function(){
	this.result=null;
	this.running=true;
	this.Run__UNSAFE__();
}

BBThread.prototype.IsRunning=function(){
	return this.running;
}

BBThread.prototype.Result=function(){
	return this.result;
}

BBThread.prototype.Run__UNSAFE__=function(){
	this.running=false;
}


function BBDataBuffer(){
	this.arrayBuffer=null;
	this.length=0;
}

BBDataBuffer.tbuf=new ArrayBuffer(4);
BBDataBuffer.tbytes=new Int8Array( BBDataBuffer.tbuf );
BBDataBuffer.tshorts=new Int16Array( BBDataBuffer.tbuf );
BBDataBuffer.tints=new Int32Array( BBDataBuffer.tbuf );
BBDataBuffer.tfloats=new Float32Array( BBDataBuffer.tbuf );

BBDataBuffer.prototype._Init=function( buffer ){
	this.arrayBuffer=buffer;
	this.length=buffer.byteLength;
	this.bytes=new Int8Array( buffer );	
	this.shorts=new Int16Array( buffer,0,this.length/2 );	
	this.ints=new Int32Array( buffer,0,this.length/4 );	
	this.floats=new Float32Array( buffer,0,this.length/4 );
}

BBDataBuffer.prototype._New=function( length ){
	if( this.arrayBuffer ) return false;
	
	var buf=new ArrayBuffer( length );
	if( !buf ) return false;
	
	this._Init( buf );
	return true;
}

BBDataBuffer.prototype._Load=function( path ){
	if( this.arrayBuffer ) return false;
	
	var buf=BBGame.Game().LoadData( path );
	if( !buf ) return false;
	
	this._Init( buf );
	return true;
}

BBDataBuffer.prototype._LoadAsync=function( path,thread ){

	var buf=this;
	
	var xhr=new XMLHttpRequest();
	xhr.open( "GET",BBGame.Game().PathToUrl( path ),true );
	xhr.responseType="arraybuffer";
	
	xhr.onload=function(e){
		if( this.status==200 || this.status==0 ){
			buf._Init( xhr.response );
			thread.result=buf;
		}
		thread.running=false;
	}
	
	xhr.onerror=function(e){
		thread.running=false;
	}
	
	xhr.send();
}


BBDataBuffer.prototype.GetArrayBuffer=function(){
	return this.arrayBuffer;
}

BBDataBuffer.prototype.Length=function(){
	return this.length;
}

BBDataBuffer.prototype.Discard=function(){
	if( this.arrayBuffer ){
		this.arrayBuffer=null;
		this.length=0;
	}
}

BBDataBuffer.prototype.PokeByte=function( addr,value ){
	this.bytes[addr]=value;
}

BBDataBuffer.prototype.PokeShort=function( addr,value ){
	if( addr&1 ){
		BBDataBuffer.tshorts[0]=value;
		this.bytes[addr]=BBDataBuffer.tbytes[0];
		this.bytes[addr+1]=BBDataBuffer.tbytes[1];
		return;
	}
	this.shorts[addr>>1]=value;
}

BBDataBuffer.prototype.PokeInt=function( addr,value ){
	if( addr&3 ){
		BBDataBuffer.tints[0]=value;
		this.bytes[addr]=BBDataBuffer.tbytes[0];
		this.bytes[addr+1]=BBDataBuffer.tbytes[1];
		this.bytes[addr+2]=BBDataBuffer.tbytes[2];
		this.bytes[addr+3]=BBDataBuffer.tbytes[3];
		return;
	}
	this.ints[addr>>2]=value;
}

BBDataBuffer.prototype.PokeFloat=function( addr,value ){
	if( addr&3 ){
		BBDataBuffer.tfloats[0]=value;
		this.bytes[addr]=BBDataBuffer.tbytes[0];
		this.bytes[addr+1]=BBDataBuffer.tbytes[1];
		this.bytes[addr+2]=BBDataBuffer.tbytes[2];
		this.bytes[addr+3]=BBDataBuffer.tbytes[3];
		return;
	}
	this.floats[addr>>2]=value;
}

BBDataBuffer.prototype.PeekByte=function( addr ){
	return this.bytes[addr];
}

BBDataBuffer.prototype.PeekShort=function( addr ){
	if( addr&1 ){
		BBDataBuffer.tbytes[0]=this.bytes[addr];
		BBDataBuffer.tbytes[1]=this.bytes[addr+1];
		return BBDataBuffer.tshorts[0];
	}
	return this.shorts[addr>>1];
}

BBDataBuffer.prototype.PeekInt=function( addr ){
	if( addr&3 ){
		BBDataBuffer.tbytes[0]=this.bytes[addr];
		BBDataBuffer.tbytes[1]=this.bytes[addr+1];
		BBDataBuffer.tbytes[2]=this.bytes[addr+2];
		BBDataBuffer.tbytes[3]=this.bytes[addr+3];
		return BBDataBuffer.tints[0];
	}
	return this.ints[addr>>2];
}

BBDataBuffer.prototype.PeekFloat=function( addr ){
	if( addr&3 ){
		BBDataBuffer.tbytes[0]=this.bytes[addr];
		BBDataBuffer.tbytes[1]=this.bytes[addr+1];
		BBDataBuffer.tbytes[2]=this.bytes[addr+2];
		BBDataBuffer.tbytes[3]=this.bytes[addr+3];
		return BBDataBuffer.tfloats[0];
	}
	return this.floats[addr>>2];
}


var bb_texs_loading=0;

function BBLoadStaticTexImage( path,info ){

	var game=BBHtml5Game.Html5Game();

	var ty=game.GetMetaData( path,"type" );
	if( ty.indexOf( "image/" )!=0 ) return null;
	
	if( info.length>0 ) info[0]=parseInt( game.GetMetaData( path,"width" ) );
	if( info.length>1 ) info[1]=parseInt( game.GetMetaData( path,"height" ) );
	
	var img=new Image();
	img.src=game.PathToUrl( path );
	
	return img;
}

function BBTextureLoading( tex ){
	return tex && tex._loading;
}

function BBTexturesLoading(){
	return bb_texs_loading;
}

function _glGenerateMipmap( target ){

	var tex=gl.getParameter( gl.TEXTURE_BINDING_2D );
	
	if( tex && tex._loading ){
		tex._genmipmap=true;
	}else{
		gl.generateMipmap( target );
	}
}

function _glBindTexture( target,tex ){

	gl.bindTexture( target,tex );
}

function _glTexImage2D( target,level,internalformat,width,height,border,format,type,pixels ){

	gl.texImage2D( target,level,internalformat,width,height,border,format,type,pixels ? new Uint8Array(pixels.arrayBuffer) : null );
}

function _glTexImage2D2( target,level,internalformat,format,type,img ){

	if( img.complete ){
		gl.pixelStorei( gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL,true );	
		gl.texImage2D( target,level,internalformat,format,type,img );
		gl.pixelStorei( gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL,false );	
		return;
	}
	
	var tex=gl.getParameter( gl.TEXTURE_BINDING_2D );
	if( 	tex._loading ){
		tex._loading+=1;
	}else{
		tex._loading=1;
	}

	bb_texs_loading+=1;
	
	var onload=function(){
	
		var tmp=gl.getParameter( gl.TEXTURE_BINDING_2D );
		gl.bindTexture( target,tex );
		
		gl.pixelStorei( gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL,true );	
		gl.texImage2D( target,level,internalformat,format,type,img );
		gl.pixelStorei( gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL,false );	

		if( tex._genmipmap && tex._loading==1 ){
			gl.generateMipmap( target );
			tex._genmipmap=false;
		}
		gl.bindTexture( target,tmp );
		
		img.removeEventListener( "load",onload );
		tex._loading-=1;
		
		bb_texs_loading-=1;
	}
	
	img.addEventListener( "load",onload );
}

function _glTexImage2D3( target,level,internalformat,format,type,path ){

	var game=BBHtml5Game.Html5Game();

	var ty=game.GetMetaData( path,"type" );
	if( ty.indexOf( "image/" )!=0 ) return null;
	
	var img=new Image();
	img.src=game.PathToUrl( path );
	
	_glTexImage2D2( target,level,internalformat,format,type,img );
}

function _glTexSubImage2D( target,level,xoffset,yoffset,width,height,format,type,data,dataOffset ){

	gl.texSubImage2D( target,level,xoffset,yoffset,width,height,format,type,new Uint8Array( data.arrayBuffer,dataOffset ) );
	
}

function _glTexSubImage2D2( target,level,xoffset,yoffset,format,type,img ){

	if( img.complete ){
		gl.texSubImage2D( target,level,xoffset,yoffset,format,type,img );
		return;
	}
	
	var tex=gl.getParameter( gl.TEXTURE_BINDING_2D );
	if( 	tex._loading>0 ){
		tex._loading+=1;
	}else{
		tex._loading=1;
	}
	
	bb_texs_loading+=1;

	var onload=function(){
	
		var tmp=gl.getParameter( gl.TEXTURE_BINDING_2D );
		gl.bindTexture( target,tex );

		gl.pixelStorei( gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL,true );	
		gl.texSubImage2D( target,level,xoffset,yoffset,format,type,img );
		gl.pixelStorei( gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL,false );

		if( tex._genmipmap && tex._loading==1 ){
			gl.generateMipmap( target );
			tex._genmipmap=false;
		}
		gl.bindTexture( target,tmp );
		
		img.removeEventListener( "load",onload );
		tex._loading-=1;
		
		bb_texs_loading-=1;
	}
	
	img.addEventListener( "load",onload );
}

function _glTexSubImage2D3( target,level,xoffset,yoffset,format,type,path ){

	var game=BBHtml5Game.Html5Game();

	var ty=game.GetMetaData( path,"type" );
	if( ty.indexOf( "image/" )!=0 ) return null;
	
	var img=new Image();
	img.src=game.PathToUrl( path );
	
	_glTexSubImage2D2( target,level,xoffset,yoffset,format,type,img );
}

// Dodgy code to convert 'any' to i,f,iv,fv...
//
function _mkf( p ){
	if( typeof(p)=="boolean" ) return p?1.0:0.0;
	if( typeof(p)=="number" ) return p;
	return 0.0;
}

function _mki( p ){
	if( typeof(p)=="boolean" ) return p?1:0;
	if( typeof(p)=="number" ) return p|0;
	if( typeof(p)=="object" ) return p;
	return 0;
}

function _mkb( p ){
	if( typeof(p)=="boolean" ) return p;
	if( typeof(p)=="number" ) return p!=0;
	return false;
}

function _mkfv( p,params ){
	if( !params || !params.length ) return;
	if( (p instanceof Array) || (p instanceof Int32Array) || (p instanceof Float32Array) ){
		var n=Math.min( params.length,p.length );
		for( var i=0;i<n;++i ){
			params[i]=_mkf(p[i]);
		}
	}else{
		params[0]=_mkf(p);
	}
}

function _mkiv( p,params ){
	if( !params || !params.length ) return;
	if( (p instanceof Array) || (p instanceof Int32Array) || (p instanceof Float32Array) ){
		var n=Math.min( params.length,p.length );
		for( var i=0;i<n;++i ){
			params[i]=_mki(p[i]);
		}
	}else{
		params[0]=_mki(p);
	}
}

function _mkbv( p,params ){
	if( !params || !params.length ) return;
	if( (p instanceof Array) || (p instanceof Int32Array) || (p instanceof Float32Array) ){
		var n=Math.min( params.length,p.length );
		for( var i=0;i<n;++i ){
			params[i]=_mkb(p[i]);
		}
	}else{
		params[0]=_mkb(p);
	}
}

function _glBufferData( target,size,data,usage ){
	if( !data ){
		gl.bufferData( target,size,usage );
	}else if( size==data.size ){
		gl.bufferData( target,data.arrayBuffer,usage );
	}else{
		gl.bufferData( target,new Int8Array( data.arrayBuffer,0,size ),usage );
	}
}

function _glBufferSubData( target,offset,size,data,dataOffset ){
	if( size==data.size && dataOffset==0 ){
		gl.bufferSubData( target,offset,data.arrayBuffer );
	}else{
		gl.bufferSubData( target,offset,new Int8Array( data.arrayBuffer,dataOffset,size ) );
	}
}


function _glClearDepthf( depth ){
	gl.clearDepth( depth );
}

function _glDepthRange( zNear,zFar ){
	gl.depthRange( zNear,zFar );
}

function _glGetActiveAttrib( program,index,size,type,name ){
	var info=gl.getActiveAttrib( program,index );
	if( size && size.length ) size[0]=info.size;
	if( type && type.length ) type[0]=info.type;
	if( name && name.length ) name[0]=info.name;
}

function _glGetActiveUniform( program,index,size,type,name ){
	var info=gl.getActiveUniform( program,index );
	if( size && size.length ) size[0]=info.size;
	if( type && type.length ) type[0]=info.type;
	if( name && name.length ) name[0]=info.name;
}

function _glGetAttachedShaders( program, maxcount, count, shaders ){
	var t=gl.getAttachedShaders();
	if( count && count.length ) count[0]=t.length;
	if( shaders ){
		var n=t.length;
		if( maxcount<n ) n=maxcount;
		if( shaders.length<n ) n=shaders.length;
		for( var i=0;i<n;++i ) shaders[i]=t[i];
	}
}

function _glGetBooleanv( pname,params ){
	_mkbv( gl.getParameter( pname ),params );
}

function _glGetBufferParameteriv( target, pname, params ){
	_mkiv( gl.glGetBufferParameter( target,pname ),params );
}

function _glGetFloatv( pname,params ){
	_mkfv( gl.getParameter( pname ),params );
}

function _glGetFramebufferAttachmentParameteriv( target, attachment, pname, params ){
	_mkiv( gl.getFrameBufferAttachmentParameter( target,attachment,pname ),params );
}

function _glGetIntegerv( pname, params ){
	_mkiv( gl.getParameter( pname ),params );
}

function _glGetProgramiv( program, pname, params ){
	_mkiv( gl.getProgramParameter( program,pname ),params );
}

function _glGetRenderbufferParameteriv( target, pname, params ){
	_mkiv( gl.getRenderbufferParameter( target,pname ),params );
}

function _glGetShaderiv( shader, pname, params ){
	_mkiv( gl.getShaderParameter( shader,pname ),params );
}

function _glGetString( pname ){
	var p=gl.getParameter( pname );
	if( typeof(p)=="string" ) return p;
	return "";
}

function _glGetTexParameterfv( target, pname, params ){
	_mkfv( gl.getTexParameter( target,pname ),params );
}

function _glGetTexParameteriv( target, pname, params ){
	_mkiv( gl.getTexParameter( target,pname ),params );
}

function _glGetUniformfv( program, location, params ){
	_mkfv( gl.getUniform( program,location ),params );
}

function _glGetUniformiv( program, location, params ){
	_mkiv( gl.getUniform( program,location ),params );
}

function _glGetUniformLocation( program, name ){
	var l=gl.getUniformLocation( program,name );
	if( l ) return l;
	return -1;
}

function _glGetVertexAttribfv( index, pname, params ){
	_mkfv( gl.getVertexAttrib( index,pname ),params );
}

function _glGetVertexAttribiv( index, pname, params ){
	_mkiv( gl.getVertexAttrib( index,pname ),params );
}

function _glReadPixels( x,y,width,height,format,type,data,dataOffset ){
	gl.readPixels( x,y,width,height,format,type,new Uint8Array( data.arrayBuffer,dataOffset,data.length-dataOffset ) );
}

function _glBindBuffer( target,buffer ){
	if( buffer ){
		gl.bindBuffer( target,buffer );
	}else{
		gl.bindBuffer( target,null );
	}
}

function _glBindFramebuffer( target,framebuffer ){
	if( framebuffer ){
		gl.bindFramebuffer( target,framebuffer );
	}else{
		gl.bindFramebuffer( target,null );
	}
}

function _glBindRenderbuffer( target,renderbuffer ){
	if( renderbuffer ){
		gl.bindRenderbuffer( target,renderbuffer );
	}else{
		gl.bindRenderbuffer( target,null );
	}
}

function _glUniform1fv( location, count, v ){
	if( v.length==count ){
		gl.uniform1fv( location,v );
	}else{
		gl.uniform1fv( location,v.slice(0,cont) );
	}
}

function _glUniform1iv( location, count, v ){
	if( v.length==count ){
		gl.uniform1iv( location,v );
	}else{
		gl.uniform1iv( location,v.slice(0,cont) );
	}
}

function _glUniform2fv( location, count, v ){
	var n=count*2;
	if( v.length==n ){
		gl.uniform2fv( location,v );
	}else{
		gl.uniform2fv( location,v.slice(0,n) );
	}
}

function _glUniform2iv( location, count, v ){
	var n=count*2;
	if( v.length==n ){
		gl.uniform2iv( location,v );
	}else{
		gl.uniform2iv( location,v.slice(0,n) );
	}
}

function _glUniform3fv( location, count, v ){
	var n=count*3;
	if( v.length==n ){
		gl.uniform3fv( location,v );
	}else{
		gl.uniform3fv( location,v.slice(0,n) );
	}
}

function _glUniform3iv( location, count, v ){
	var n=count*3;
	if( v.length==n ){
		gl.uniform3iv( location,v );
	}else{
		gl.uniform3iv( location,v.slice(0,n) );
	}
}

function _glUniform4fv( location, count, v ){
	var n=count*4;
	if( v.length==n ){
		gl.uniform4fv( location,v );
	}else{
		gl.uniform4fv( location,v.slice(0,n) );
	}
}

function _glUniform4iv( location, count, v ){
	var n=count*4;
	if( v.length==n ){
		gl.uniform4iv( location,v );
	}else{
		gl.uniform4iv( location,v.slice(0,n) );
	}
}

function _glUniformMatrix2fv( location, count, transpose, value ){
	var n=count*4;
	if( value.length==n ){
		gl.uniformMatrix2fv( location,transpose,value );
	}else{
		gl.uniformMatrix2fv( location,transpose,value.slice(0,n) );
	}
}

function _glUniformMatrix3fv( location, count, transpose, value ){
	var n=count*9;
	if( value.length==n ){
		gl.uniformMatrix3fv( location,transpose,value );
	}else{
		gl.uniformMatrix3fv( location,transpose,value.slice(0,n) );
	}
}

function _glUniformMatrix4fv( location, count, transpose, value ){
	var n=count*16;
	if( value.length==n ){
		gl.uniformMatrix4fv( location,transpose,value );
	}else{
		gl.uniformMatrix4fv( location,transpose,value.slice(0,n) );
	}
}

/**
* @return Int
******************/
function systemMillisecs(){
	return new Date().getTime();
}

function c_App(){
	Object.call(this);
}
c_App.m_new=function(){
	if((bb_app__app)!=null){
		error("App has already been created");
	}
	bb_app__app=this;
	bb_app__delegate=c_GameDelegate.m_new.call(new c_GameDelegate);
	bb_app__game.SetDelegate(bb_app__delegate);
	return this;
}
c_App.prototype.p_OnResize=function(){
	return 0;
}
c_App.prototype.p_OnCreate=function(){
	return 0;
}
c_App.prototype.p_OnSuspend=function(){
	return 0;
}
c_App.prototype.p_OnResume=function(){
	return 0;
}
c_App.prototype.p_OnUpdate=function(){
	return 0;
}
c_App.prototype.p_OnLoading=function(){
	return 0;
}
c_App.prototype.p_OnRender=function(){
	return 0;
}
c_App.prototype.p_OnClose=function(){
	bb_app_EndApp();
	return 0;
}
c_App.prototype.p_OnBack=function(){
	this.p_OnClose();
	return 0;
}
function c_SimpleGame(){
	c_App.call(this);
}
c_SimpleGame.prototype=extend_class(c_App);
c_SimpleGame.m_new=function(){
	c_App.m_new.call(this);
	return this;
}
c_SimpleGame.prototype.p_OnCreate=function(){
	bb_app_SetUpdateRate(60);
	bb_simplegame2_sgWorldWidth=bb_app_DeviceWidth();
	bb_simplegame2_sgWorldHeight=bb_app_DeviceHeight();
	bb_simplegame2_sgCanvas=c_Canvas.m_new.call(new c_Canvas,null);
	return 0;
}
c_SimpleGame.prototype.p_OnUpdate=function(){
	return 0;
}
c_SimpleGame.prototype.p_OnRender=function(){
	bb_simplegame2_sgCanvas.p_Clear(0.0,0.0,0.0,1.0);
	bb_simplegame2_sgCanvas.p_Flush();
	return 0;
}
function c_Game(){
	c_SimpleGame.call(this);
	this.m_titleScreen=null;
	this.m_started=false;
	this.m_princesses=null;
	this.m_flakeImage=null;
	this.m_simplePool=null;
	this.m_images=[];
	this.m_particleImages=[];
	this.m_flakes=null;
	this.m_background=null;
}
c_Game.prototype=extend_class(c_SimpleGame);
c_Game.m_new=function(){
	c_SimpleGame.m_new.call(this);
	return this;
}
c_Game.prototype.p_OnCreate=function(){
	c_SimpleGame.prototype.p_OnCreate.call(this);
	this.m_titleScreen=c_SimpleObject.m_new.call(new c_SimpleObject);
	this.m_titleScreen.p_Init3();
	this.m_titleScreen.p_SetImage3("titlescreen.png");
	this.m_titleScreen.m_x=((bb_app_DeviceWidth()/2)|0);
	this.m_titleScreen.m_y=((bb_app_DeviceHeight()/2)|0);
	this.m_started=false;
	this.m_princesses=c_SimpleGroup.m_new.call(new c_SimpleGroup);
	var t_elsa=c_Image2.m_Load("elsa.png",.5,.5,3,null);
	var t_anna=c_Image2.m_Load("anna.png",.5,.5,3,null);
	var t_snowWhite=c_Image2.m_Load("snowwhite.png",.5,.5,3,null);
	var t_rapunzel=c_Image2.m_Load("rapunzel.png",.5,.5,3,null);
	var t_princess=c_Image2.m_Load("princess.png",.5,.5,3,null);
	var t_flower=c_Image2.m_Load("flower.png",.5,.5,3,null);
	var t_rTree=c_Image2.m_Load("rainbow-tree.png",.5,.5,3,null);
	var t_butterfly=c_Image2.m_Load("butterfly.png",.5,.5,3,null);
	var t_rHeart=c_Image2.m_Load("rainbow-heart.png",.5,.5,3,null);
	this.m_flakeImage=c_Image2.m_Load("snowflake.png",.5,.5,3,null);
	this.m_simplePool=c_SimplePool.m_new.call(new c_SimplePool);
	this.m_images=[t_elsa,t_anna,t_snowWhite,t_rapunzel,t_princess];
	this.m_particleImages=[this.m_flakeImage,t_flower,t_rTree,t_butterfly,t_rHeart];
	this.m_princesses=c_SimpleGroup.m_new.call(new c_SimpleGroup);
	this.m_flakes=c_SimpleGroup.m_new.call(new c_SimpleGroup);
	this.m_background=c_Image2.m_Load("rainbow-background-cropped.jpg",.5,.5,3,null);
	return 0;
}
c_Game.prototype.p_OffScreen=function(t_obj){
	return t_obj.m_x<-100.0 || t_obj.m_x>(bb_app_DeviceWidth()+100) || t_obj.m_y<-100.0 || t_obj.m_y>(bb_app_DeviceHeight()+100);
}
c_Game.prototype.p_OnUpdate=function(){
	this.m_titleScreen.p_Update();
	if(((bb_input_MouseHit(0))!=0) || ((bb_input_MouseDown(1))!=0)){
		if(!this.m_started){
			this.m_started=true;
			this.m_titleScreen.m_va=-0.1;
			this.m_titleScreen.m_vy=-5.0;
		}
		var t_p=this.m_simplePool.p_Get3();
		var t_imgChoice=((bb_random_Rnd2(0.0,(this.m_images.length)))|0);
		t_p.p_Init3();
		t_p.p_SetImage(this.m_images[t_imgChoice]);
		t_p.m_x=bb_input_MouseX();
		t_p.m_y=bb_input_MouseY();
		t_p.m_va=-0.005;
		t_p.p_Launch(bb_random_Rnd2(0.0,360.0),bb_random_Rnd2(1.0,2.0));
		this.m_princesses.p_Push19(t_p);
		var t_flakeCount=50;
		var t_i=0;
		while(t_i<t_flakeCount){
			var t_flake=this.m_simplePool.p_Get3();
			t_flake.p_Init3();
			t_flake.p_SetImage(this.m_particleImages[t_imgChoice]);
			t_flake.m_x=bb_input_MouseX();
			t_flake.m_y=bb_input_MouseY();
			t_flake.p_Launch(bb_random_Rnd2(0.0,360.0),bb_random_Rnd2(2.0,6.0));
			t_flake.m_vr=bb_random_Rnd2(-3.0,3.0);
			this.m_flakes.p_Push19(t_flake);
			t_i+=1;
		}
	}
	this.m_princesses.p_Update();
	var t_=this.m_princesses.p_ObjectEnumerator();
	while(t_.p_HasNext()){
		var t_p2=t_.p_NextObject();
		if(t_p2.m_dead || !t_p2.m_visible || this.p_OffScreen(t_p2)){
			this.m_simplePool.p_Recycle(t_p2);
			this.m_princesses.p_RemoveEach(t_p2);
		}
	}
	this.m_flakes.p_Update();
	var t_2=this.m_flakes.p_ObjectEnumerator();
	while(t_2.p_HasNext()){
		var t_f=t_2.p_NextObject();
		if(this.p_OffScreen(t_f)){
			this.m_simplePool.p_Recycle(t_f);
			this.m_flakes.p_RemoveEach(t_f);
		}
	}
	return 0;
}
c_Game.prototype.p_OnRender=function(){
	bb_simplegame2_sgCanvas.p_Clear(0.0,0.0,0.0,1.0);
	bb_simplegame2_sgCanvas.p_DrawImage2(this.m_background,((bb_app_DeviceWidth()/2)|0),((bb_app_DeviceHeight()/2)|0),0.0,((bb_app_DeviceWidth()/640)|0),((bb_app_DeviceHeight()/480)|0));
	this.m_flakes.p_Render3(0.0,0.0);
	this.m_princesses.p_Render3(0.0,0.0);
	this.m_titleScreen.p_Render3(0.0,0.0);
	bb_simplegame2_sgCanvas.p_Flush();
	return 0;
}
var bb_app__app=null;
function c_GameDelegate(){
	BBGameDelegate.call(this);
	this.m__graphics=null;
	this.m__audio=null;
	this.m__input=null;
}
c_GameDelegate.prototype=extend_class(BBGameDelegate);
c_GameDelegate.m_new=function(){
	return this;
}
c_GameDelegate.prototype.StartGame=function(){
	this.m__graphics=(new gxtkGraphics);
	bb_graphics_SetGraphicsDevice(this.m__graphics);
	bb_graphics_SetFont(null,32);
	this.m__audio=(new gxtkAudio);
	bb_audio_SetAudioDevice(this.m__audio);
	this.m__input=c_InputDevice.m_new.call(new c_InputDevice);
	bb_input_SetInputDevice(this.m__input);
	bb_app_ValidateDeviceWindow(false);
	bb_app_EnumDisplayModes();
	bb_app__app.p_OnCreate();
}
c_GameDelegate.prototype.SuspendGame=function(){
	bb_app__app.p_OnSuspend();
	this.m__audio.Suspend();
}
c_GameDelegate.prototype.ResumeGame=function(){
	this.m__audio.Resume();
	bb_app__app.p_OnResume();
}
c_GameDelegate.prototype.UpdateGame=function(){
	bb_app_ValidateDeviceWindow(true);
	this.m__input.p_BeginUpdate();
	bb_app__app.p_OnUpdate();
	this.m__input.p_EndUpdate();
}
c_GameDelegate.prototype.RenderGame=function(){
	bb_app_ValidateDeviceWindow(true);
	var t_mode=this.m__graphics.BeginRender();
	if((t_mode)!=0){
		bb_graphics_BeginRender();
	}
	if(t_mode==2){
		bb_app__app.p_OnLoading();
	}else{
		bb_app__app.p_OnRender();
	}
	if((t_mode)!=0){
		bb_graphics_EndRender();
	}
	this.m__graphics.EndRender();
}
c_GameDelegate.prototype.KeyEvent=function(t_event,t_data){
	this.m__input.p_KeyEvent(t_event,t_data);
	if(t_event!=1){
		return;
	}
	var t_1=t_data;
	if(t_1==432){
		bb_app__app.p_OnClose();
	}else{
		if(t_1==416){
			bb_app__app.p_OnBack();
		}
	}
}
c_GameDelegate.prototype.MouseEvent=function(t_event,t_data,t_x,t_y){
	this.m__input.p_MouseEvent(t_event,t_data,t_x,t_y);
}
c_GameDelegate.prototype.TouchEvent=function(t_event,t_data,t_x,t_y){
	this.m__input.p_TouchEvent(t_event,t_data,t_x,t_y);
}
c_GameDelegate.prototype.MotionEvent=function(t_event,t_data,t_x,t_y,t_z){
	this.m__input.p_MotionEvent(t_event,t_data,t_x,t_y,t_z);
}
c_GameDelegate.prototype.DiscardGraphics=function(){
	this.m__graphics.DiscardGraphics();
}
var bb_app__delegate=null;
var bb_app__game=null;
function bbMain(){
	c_Game.m_new.call(new c_Game);
	return 0;
}
var bb_graphics_device=null;
function bb_graphics_SetGraphicsDevice(t_dev){
	bb_graphics_device=t_dev;
	return 0;
}
function c_Image(){
	Object.call(this);
	this.m_surface=null;
	this.m_width=0;
	this.m_height=0;
	this.m_frames=[];
	this.m_flags=0;
	this.m_tx=.0;
	this.m_ty=.0;
	this.m_source=null;
}
c_Image.m_DefaultFlags=0;
c_Image.m_new=function(){
	return this;
}
c_Image.prototype.p_SetHandle=function(t_tx,t_ty){
	this.m_tx=t_tx;
	this.m_ty=t_ty;
	this.m_flags=this.m_flags&-2;
	return 0;
}
c_Image.prototype.p_ApplyFlags=function(t_iflags){
	this.m_flags=t_iflags;
	if((this.m_flags&2)!=0){
		var t_=this.m_frames;
		var t_2=0;
		while(t_2<t_.length){
			var t_f=t_[t_2];
			t_2=t_2+1;
			t_f.m_x+=1;
		}
		this.m_width-=2;
	}
	if((this.m_flags&4)!=0){
		var t_3=this.m_frames;
		var t_4=0;
		while(t_4<t_3.length){
			var t_f2=t_3[t_4];
			t_4=t_4+1;
			t_f2.m_y+=1;
		}
		this.m_height-=2;
	}
	if((this.m_flags&1)!=0){
		this.p_SetHandle((this.m_width)/2.0,(this.m_height)/2.0);
	}
	if(this.m_frames.length==1 && this.m_frames[0].m_x==0 && this.m_frames[0].m_y==0 && this.m_width==this.m_surface.Width() && this.m_height==this.m_surface.Height()){
		this.m_flags|=65536;
	}
	return 0;
}
c_Image.prototype.p_Init=function(t_surf,t_nframes,t_iflags){
	if((this.m_surface)!=null){
		error("Image already initialized");
	}
	this.m_surface=t_surf;
	this.m_width=((this.m_surface.Width()/t_nframes)|0);
	this.m_height=this.m_surface.Height();
	this.m_frames=new_object_array(t_nframes);
	for(var t_i=0;t_i<t_nframes;t_i=t_i+1){
		this.m_frames[t_i]=c_Frame.m_new.call(new c_Frame,t_i*this.m_width,0);
	}
	this.p_ApplyFlags(t_iflags);
	return this;
}
c_Image.prototype.p_Init2=function(t_surf,t_x,t_y,t_iwidth,t_iheight,t_nframes,t_iflags,t_src,t_srcx,t_srcy,t_srcw,t_srch){
	if((this.m_surface)!=null){
		error("Image already initialized");
	}
	this.m_surface=t_surf;
	this.m_source=t_src;
	this.m_width=t_iwidth;
	this.m_height=t_iheight;
	this.m_frames=new_object_array(t_nframes);
	var t_ix=t_x;
	var t_iy=t_y;
	for(var t_i=0;t_i<t_nframes;t_i=t_i+1){
		if(t_ix+this.m_width>t_srcw){
			t_ix=0;
			t_iy+=this.m_height;
		}
		if(t_ix+this.m_width>t_srcw || t_iy+this.m_height>t_srch){
			error("Image frame outside surface");
		}
		this.m_frames[t_i]=c_Frame.m_new.call(new c_Frame,t_ix+t_srcx,t_iy+t_srcy);
		t_ix+=this.m_width;
	}
	this.p_ApplyFlags(t_iflags);
	return this;
}
function c_GraphicsContext(){
	Object.call(this);
	this.m_defaultFont=null;
	this.m_font=null;
	this.m_firstChar=0;
	this.m_matrixSp=0;
	this.m_ix=1.0;
	this.m_iy=.0;
	this.m_jx=.0;
	this.m_jy=1.0;
	this.m_tx=.0;
	this.m_ty=.0;
	this.m_tformed=0;
	this.m_matDirty=0;
	this.m_color_r=.0;
	this.m_color_g=.0;
	this.m_color_b=.0;
	this.m_alpha=.0;
	this.m_blend=0;
	this.m_scissor_x=.0;
	this.m_scissor_y=.0;
	this.m_scissor_width=.0;
	this.m_scissor_height=.0;
}
c_GraphicsContext.m_new=function(){
	return this;
}
var bb_graphics_context=null;
function bb_data_FixDataPath(t_path){
	var t_i=t_path.indexOf(":/",0);
	if(t_i!=-1 && t_path.indexOf("/",0)==t_i+1){
		return t_path;
	}
	if(string_startswith(t_path,"./") || string_startswith(t_path,"/")){
		return t_path;
	}
	return "monkey://data/"+t_path;
}
function c_Frame(){
	Object.call(this);
	this.m_x=0;
	this.m_y=0;
}
c_Frame.m_new=function(t_x,t_y){
	this.m_x=t_x;
	this.m_y=t_y;
	return this;
}
c_Frame.m_new2=function(){
	return this;
}
function bb_graphics_LoadImage(t_path,t_frameCount,t_flags){
	var t_surf=bb_graphics_device.LoadSurface(bb_data_FixDataPath(t_path));
	if((t_surf)!=null){
		return (c_Image.m_new.call(new c_Image)).p_Init(t_surf,t_frameCount,t_flags);
	}
	return null;
}
function bb_graphics_LoadImage2(t_path,t_frameWidth,t_frameHeight,t_frameCount,t_flags){
	var t_surf=bb_graphics_device.LoadSurface(bb_data_FixDataPath(t_path));
	if((t_surf)!=null){
		return (c_Image.m_new.call(new c_Image)).p_Init2(t_surf,0,0,t_frameWidth,t_frameHeight,t_frameCount,t_flags,null,0,0,t_surf.Width(),t_surf.Height());
	}
	return null;
}
function bb_graphics_SetFont(t_font,t_firstChar){
	if(!((t_font)!=null)){
		if(!((bb_graphics_context.m_defaultFont)!=null)){
			bb_graphics_context.m_defaultFont=bb_graphics_LoadImage("mojo_font.png",96,2);
		}
		t_font=bb_graphics_context.m_defaultFont;
		t_firstChar=32;
	}
	bb_graphics_context.m_font=t_font;
	bb_graphics_context.m_firstChar=t_firstChar;
	return 0;
}
var bb_audio_device=null;
function bb_audio_SetAudioDevice(t_dev){
	bb_audio_device=t_dev;
	return 0;
}
function c_InputDevice(){
	Object.call(this);
	this.m__joyStates=new_object_array(4);
	this.m__keyDown=new_bool_array(512);
	this.m__keyHitPut=0;
	this.m__keyHitQueue=new_number_array(33);
	this.m__keyHit=new_number_array(512);
	this.m__charGet=0;
	this.m__charPut=0;
	this.m__charQueue=new_number_array(32);
	this.m__mouseX=.0;
	this.m__mouseY=.0;
	this.m__touchX=new_number_array(32);
	this.m__touchY=new_number_array(32);
	this.m__accelX=.0;
	this.m__accelY=.0;
	this.m__accelZ=.0;
}
c_InputDevice.m_new=function(){
	for(var t_i=0;t_i<4;t_i=t_i+1){
		this.m__joyStates[t_i]=c_JoyState.m_new.call(new c_JoyState);
	}
	return this;
}
c_InputDevice.prototype.p_PutKeyHit=function(t_key){
	if(this.m__keyHitPut==this.m__keyHitQueue.length){
		return;
	}
	this.m__keyHit[t_key]+=1;
	this.m__keyHitQueue[this.m__keyHitPut]=t_key;
	this.m__keyHitPut+=1;
}
c_InputDevice.prototype.p_BeginUpdate=function(){
	for(var t_i=0;t_i<4;t_i=t_i+1){
		var t_state=this.m__joyStates[t_i];
		if(!BBGame.Game().PollJoystick(t_i,t_state.m_joyx,t_state.m_joyy,t_state.m_joyz,t_state.m_buttons)){
			break;
		}
		for(var t_j=0;t_j<32;t_j=t_j+1){
			var t_key=256+t_i*32+t_j;
			if(t_state.m_buttons[t_j]){
				if(!this.m__keyDown[t_key]){
					this.m__keyDown[t_key]=true;
					this.p_PutKeyHit(t_key);
				}
			}else{
				this.m__keyDown[t_key]=false;
			}
		}
	}
}
c_InputDevice.prototype.p_EndUpdate=function(){
	for(var t_i=0;t_i<this.m__keyHitPut;t_i=t_i+1){
		this.m__keyHit[this.m__keyHitQueue[t_i]]=0;
	}
	this.m__keyHitPut=0;
	this.m__charGet=0;
	this.m__charPut=0;
}
c_InputDevice.prototype.p_KeyEvent=function(t_event,t_data){
	var t_1=t_event;
	if(t_1==1){
		if(!this.m__keyDown[t_data]){
			this.m__keyDown[t_data]=true;
			this.p_PutKeyHit(t_data);
			if(t_data==1){
				this.m__keyDown[384]=true;
				this.p_PutKeyHit(384);
			}else{
				if(t_data==384){
					this.m__keyDown[1]=true;
					this.p_PutKeyHit(1);
				}
			}
		}
	}else{
		if(t_1==2){
			if(this.m__keyDown[t_data]){
				this.m__keyDown[t_data]=false;
				if(t_data==1){
					this.m__keyDown[384]=false;
				}else{
					if(t_data==384){
						this.m__keyDown[1]=false;
					}
				}
			}
		}else{
			if(t_1==3){
				if(this.m__charPut<this.m__charQueue.length){
					this.m__charQueue[this.m__charPut]=t_data;
					this.m__charPut+=1;
				}
			}
		}
	}
}
c_InputDevice.prototype.p_MouseEvent=function(t_event,t_data,t_x,t_y){
	var t_2=t_event;
	if(t_2==4){
		this.p_KeyEvent(1,1+t_data);
	}else{
		if(t_2==5){
			this.p_KeyEvent(2,1+t_data);
			return;
		}else{
			if(t_2==6){
			}else{
				return;
			}
		}
	}
	this.m__mouseX=t_x;
	this.m__mouseY=t_y;
	this.m__touchX[0]=t_x;
	this.m__touchY[0]=t_y;
}
c_InputDevice.prototype.p_TouchEvent=function(t_event,t_data,t_x,t_y){
	var t_3=t_event;
	if(t_3==7){
		this.p_KeyEvent(1,384+t_data);
	}else{
		if(t_3==8){
			this.p_KeyEvent(2,384+t_data);
			return;
		}else{
			if(t_3==9){
			}else{
				return;
			}
		}
	}
	this.m__touchX[t_data]=t_x;
	this.m__touchY[t_data]=t_y;
	if(t_data==0){
		this.m__mouseX=t_x;
		this.m__mouseY=t_y;
	}
}
c_InputDevice.prototype.p_MotionEvent=function(t_event,t_data,t_x,t_y,t_z){
	var t_4=t_event;
	if(t_4==10){
	}else{
		return;
	}
	this.m__accelX=t_x;
	this.m__accelY=t_y;
	this.m__accelZ=t_z;
}
c_InputDevice.prototype.p_KeyHit=function(t_key){
	if(t_key>0 && t_key<512){
		return this.m__keyHit[t_key];
	}
	return 0;
}
c_InputDevice.prototype.p_KeyDown=function(t_key){
	if(t_key>0 && t_key<512){
		return this.m__keyDown[t_key];
	}
	return false;
}
c_InputDevice.prototype.p_MouseX=function(){
	return this.m__mouseX;
}
c_InputDevice.prototype.p_MouseY=function(){
	return this.m__mouseY;
}
function c_JoyState(){
	Object.call(this);
	this.m_joyx=new_number_array(2);
	this.m_joyy=new_number_array(2);
	this.m_joyz=new_number_array(2);
	this.m_buttons=new_bool_array(32);
}
c_JoyState.m_new=function(){
	return this;
}
var bb_input_device=null;
function bb_input_SetInputDevice(t_dev){
	bb_input_device=t_dev;
	return 0;
}
var bb_app__devWidth=0;
var bb_app__devHeight=0;
function bb_app_ValidateDeviceWindow(t_notifyApp){
	var t_w=bb_app__game.GetDeviceWidth();
	var t_h=bb_app__game.GetDeviceHeight();
	if(t_w==bb_app__devWidth && t_h==bb_app__devHeight){
		return;
	}
	bb_app__devWidth=t_w;
	bb_app__devHeight=t_h;
	if(t_notifyApp){
		bb_app__app.p_OnResize();
	}
}
function c_DisplayMode(){
	Object.call(this);
	this.m__width=0;
	this.m__height=0;
}
c_DisplayMode.m_new=function(t_width,t_height){
	this.m__width=t_width;
	this.m__height=t_height;
	return this;
}
c_DisplayMode.m_new2=function(){
	return this;
}
function c_Map(){
	Object.call(this);
	this.m_root=null;
}
c_Map.m_new=function(){
	return this;
}
c_Map.prototype.p_Compare=function(t_lhs,t_rhs){
}
c_Map.prototype.p_FindNode=function(t_key){
	var t_node=this.m_root;
	while((t_node)!=null){
		var t_cmp=this.p_Compare(t_key,t_node.m_key);
		if(t_cmp>0){
			t_node=t_node.m_right;
		}else{
			if(t_cmp<0){
				t_node=t_node.m_left;
			}else{
				return t_node;
			}
		}
	}
	return t_node;
}
c_Map.prototype.p_Contains=function(t_key){
	return this.p_FindNode(t_key)!=null;
}
c_Map.prototype.p_RotateLeft=function(t_node){
	var t_child=t_node.m_right;
	t_node.m_right=t_child.m_left;
	if((t_child.m_left)!=null){
		t_child.m_left.m_parent=t_node;
	}
	t_child.m_parent=t_node.m_parent;
	if((t_node.m_parent)!=null){
		if(t_node==t_node.m_parent.m_left){
			t_node.m_parent.m_left=t_child;
		}else{
			t_node.m_parent.m_right=t_child;
		}
	}else{
		this.m_root=t_child;
	}
	t_child.m_left=t_node;
	t_node.m_parent=t_child;
	return 0;
}
c_Map.prototype.p_RotateRight=function(t_node){
	var t_child=t_node.m_left;
	t_node.m_left=t_child.m_right;
	if((t_child.m_right)!=null){
		t_child.m_right.m_parent=t_node;
	}
	t_child.m_parent=t_node.m_parent;
	if((t_node.m_parent)!=null){
		if(t_node==t_node.m_parent.m_right){
			t_node.m_parent.m_right=t_child;
		}else{
			t_node.m_parent.m_left=t_child;
		}
	}else{
		this.m_root=t_child;
	}
	t_child.m_right=t_node;
	t_node.m_parent=t_child;
	return 0;
}
c_Map.prototype.p_InsertFixup=function(t_node){
	while(((t_node.m_parent)!=null) && t_node.m_parent.m_color==-1 && ((t_node.m_parent.m_parent)!=null)){
		if(t_node.m_parent==t_node.m_parent.m_parent.m_left){
			var t_uncle=t_node.m_parent.m_parent.m_right;
			if(((t_uncle)!=null) && t_uncle.m_color==-1){
				t_node.m_parent.m_color=1;
				t_uncle.m_color=1;
				t_uncle.m_parent.m_color=-1;
				t_node=t_uncle.m_parent;
			}else{
				if(t_node==t_node.m_parent.m_right){
					t_node=t_node.m_parent;
					this.p_RotateLeft(t_node);
				}
				t_node.m_parent.m_color=1;
				t_node.m_parent.m_parent.m_color=-1;
				this.p_RotateRight(t_node.m_parent.m_parent);
			}
		}else{
			var t_uncle2=t_node.m_parent.m_parent.m_left;
			if(((t_uncle2)!=null) && t_uncle2.m_color==-1){
				t_node.m_parent.m_color=1;
				t_uncle2.m_color=1;
				t_uncle2.m_parent.m_color=-1;
				t_node=t_uncle2.m_parent;
			}else{
				if(t_node==t_node.m_parent.m_left){
					t_node=t_node.m_parent;
					this.p_RotateRight(t_node);
				}
				t_node.m_parent.m_color=1;
				t_node.m_parent.m_parent.m_color=-1;
				this.p_RotateLeft(t_node.m_parent.m_parent);
			}
		}
	}
	this.m_root.m_color=1;
	return 0;
}
c_Map.prototype.p_Set=function(t_key,t_value){
	var t_node=this.m_root;
	var t_parent=null;
	var t_cmp=0;
	while((t_node)!=null){
		t_parent=t_node;
		t_cmp=this.p_Compare(t_key,t_node.m_key);
		if(t_cmp>0){
			t_node=t_node.m_right;
		}else{
			if(t_cmp<0){
				t_node=t_node.m_left;
			}else{
				t_node.m_value=t_value;
				return false;
			}
		}
	}
	t_node=c_Node.m_new.call(new c_Node,t_key,t_value,-1,t_parent);
	if((t_parent)!=null){
		if(t_cmp>0){
			t_parent.m_right=t_node;
		}else{
			t_parent.m_left=t_node;
		}
		this.p_InsertFixup(t_node);
	}else{
		this.m_root=t_node;
	}
	return true;
}
c_Map.prototype.p_Insert=function(t_key,t_value){
	return this.p_Set(t_key,t_value);
}
function c_IntMap(){
	c_Map.call(this);
}
c_IntMap.prototype=extend_class(c_Map);
c_IntMap.m_new=function(){
	c_Map.m_new.call(this);
	return this;
}
c_IntMap.prototype.p_Compare=function(t_lhs,t_rhs){
	return t_lhs-t_rhs;
}
function c_Stack(){
	Object.call(this);
	this.m_data=[];
	this.m_length=0;
}
c_Stack.m_new=function(){
	return this;
}
c_Stack.m_new2=function(t_data){
	this.m_data=t_data.slice(0);
	this.m_length=t_data.length;
	return this;
}
c_Stack.prototype.p_Push=function(t_value){
	if(this.m_length==this.m_data.length){
		this.m_data=resize_object_array(this.m_data,this.m_length*2+10);
	}
	this.m_data[this.m_length]=t_value;
	this.m_length+=1;
}
c_Stack.prototype.p_Push2=function(t_values,t_offset,t_count){
	for(var t_i=0;t_i<t_count;t_i=t_i+1){
		this.p_Push(t_values[t_offset+t_i]);
	}
}
c_Stack.prototype.p_Push3=function(t_values,t_offset){
	this.p_Push2(t_values,t_offset,t_values.length-t_offset);
}
c_Stack.prototype.p_ToArray=function(){
	var t_t=new_object_array(this.m_length);
	for(var t_i=0;t_i<this.m_length;t_i=t_i+1){
		t_t[t_i]=this.m_data[t_i];
	}
	return t_t;
}
function c_Node(){
	Object.call(this);
	this.m_key=0;
	this.m_right=null;
	this.m_left=null;
	this.m_value=null;
	this.m_color=0;
	this.m_parent=null;
}
c_Node.m_new=function(t_key,t_value,t_color,t_parent){
	this.m_key=t_key;
	this.m_value=t_value;
	this.m_color=t_color;
	this.m_parent=t_parent;
	return this;
}
c_Node.m_new2=function(){
	return this;
}
var bb_app__displayModes=[];
var bb_app__desktopMode=null;
function bb_app_DeviceWidth(){
	return bb_app__devWidth;
}
function bb_app_DeviceHeight(){
	return bb_app__devHeight;
}
function bb_app_EnumDisplayModes(){
	var t_modes=bb_app__game.GetDisplayModes();
	var t_mmap=c_IntMap.m_new.call(new c_IntMap);
	var t_mstack=c_Stack.m_new.call(new c_Stack);
	for(var t_i=0;t_i<t_modes.length;t_i=t_i+1){
		var t_w=t_modes[t_i].width;
		var t_h=t_modes[t_i].height;
		var t_size=t_w<<16|t_h;
		if(t_mmap.p_Contains(t_size)){
		}else{
			var t_mode=c_DisplayMode.m_new.call(new c_DisplayMode,t_modes[t_i].width,t_modes[t_i].height);
			t_mmap.p_Insert(t_size,t_mode);
			t_mstack.p_Push(t_mode);
		}
	}
	bb_app__displayModes=t_mstack.p_ToArray();
	var t_mode2=bb_app__game.GetDesktopMode();
	if((t_mode2)!=null){
		bb_app__desktopMode=c_DisplayMode.m_new.call(new c_DisplayMode,t_mode2.width,t_mode2.height);
	}else{
		bb_app__desktopMode=c_DisplayMode.m_new.call(new c_DisplayMode,bb_app_DeviceWidth(),bb_app_DeviceHeight());
	}
}
var bb_graphics_renderDevice=null;
function bb_graphics_SetMatrix(t_ix,t_iy,t_jx,t_jy,t_tx,t_ty){
	bb_graphics_context.m_ix=t_ix;
	bb_graphics_context.m_iy=t_iy;
	bb_graphics_context.m_jx=t_jx;
	bb_graphics_context.m_jy=t_jy;
	bb_graphics_context.m_tx=t_tx;
	bb_graphics_context.m_ty=t_ty;
	bb_graphics_context.m_tformed=((t_ix!=1.0 || t_iy!=0.0 || t_jx!=0.0 || t_jy!=1.0 || t_tx!=0.0 || t_ty!=0.0)?1:0);
	bb_graphics_context.m_matDirty=1;
	return 0;
}
function bb_graphics_SetMatrix2(t_m){
	bb_graphics_SetMatrix(t_m[0],t_m[1],t_m[2],t_m[3],t_m[4],t_m[5]);
	return 0;
}
function bb_graphics_SetColor(t_r,t_g,t_b){
	bb_graphics_context.m_color_r=t_r;
	bb_graphics_context.m_color_g=t_g;
	bb_graphics_context.m_color_b=t_b;
	bb_graphics_renderDevice.SetColor(t_r,t_g,t_b);
	return 0;
}
function bb_graphics_SetAlpha(t_alpha){
	bb_graphics_context.m_alpha=t_alpha;
	bb_graphics_renderDevice.SetAlpha(t_alpha);
	return 0;
}
function bb_graphics_SetBlend(t_blend){
	bb_graphics_context.m_blend=t_blend;
	bb_graphics_renderDevice.SetBlend(t_blend);
	return 0;
}
function bb_graphics_SetScissor(t_x,t_y,t_width,t_height){
	bb_graphics_context.m_scissor_x=t_x;
	bb_graphics_context.m_scissor_y=t_y;
	bb_graphics_context.m_scissor_width=t_width;
	bb_graphics_context.m_scissor_height=t_height;
	bb_graphics_renderDevice.SetScissor(((t_x)|0),((t_y)|0),((t_width)|0),((t_height)|0));
	return 0;
}
function bb_graphics_BeginRender(){
	bb_graphics_renderDevice=bb_graphics_device;
	bb_graphics_context.m_matrixSp=0;
	bb_graphics_SetMatrix(1.0,0.0,0.0,1.0,0.0,0.0);
	bb_graphics_SetColor(255.0,255.0,255.0);
	bb_graphics_SetAlpha(1.0);
	bb_graphics_SetBlend(0);
	bb_graphics_SetScissor(0.0,0.0,(bb_app_DeviceWidth()),(bb_app_DeviceHeight()));
	return 0;
}
function bb_graphics_EndRender(){
	bb_graphics_renderDevice=null;
	return 0;
}
function c_BBGameEvent(){
	Object.call(this);
}
function bb_app_EndApp(){
	error("");
}
var bb_app__updateRate=0;
function bb_app_SetUpdateRate(t_hertz){
	bb_app__updateRate=t_hertz;
	bb_app__game.SetUpdateRate(t_hertz);
}
var bb_simplegame2_sgWorldWidth=0;
var bb_simplegame2_sgWorldHeight=0;
function c_DrawList(){
	Object.call(this);
	this.m__font=null;
	this.m__defaultMaterial=null;
	this.m__next=0;
	this.m__ops=c_Stack3.m_new.call(new c_Stack3);
	this.m__data=c_DataBuffer.m_new.call(new c_DataBuffer,4096);
	this.m__op=bb_graphics2_nullOp;
	this.m__casters=c_Stack4.m_new.call(new c_Stack4);
	this.m__casterVerts=c_FloatStack.m_new2.call(new c_FloatStack);
	this.m__blend=1;
	this.m__ix=1.0;
	this.m__jx=.0;
	this.m__tx=.0;
	this.m__iy=.0;
	this.m__jy=1.0;
	this.m__ty=.0;
	this.m__pmcolor=-1;
	this.m__matStack=new_number_array(384);
	this.m__matSp=0;
	this.m__color=[1.0,1.0,1.0,1.0];
	this.m__alpha=255.0;
}
c_DrawList.prototype.p_SetFont=function(t_font){
	if(!((t_font)!=null)){
		t_font=bb_graphics2_defaultFont;
	}
	this.m__font=t_font;
}
c_DrawList.prototype.p_SetDefaultMaterial=function(t_material){
	this.m__defaultMaterial=t_material;
}
c_DrawList.m_new=function(){
	bb_graphics2_Init();
	this.p_SetFont(null);
	this.p_SetDefaultMaterial(bb_graphics2_fastShader.p_DefaultMaterial());
	return this;
}
c_DrawList.prototype.p_IsEmpty=function(){
	return this.m__next==0;
}
c_DrawList.prototype.p_Render=function(t_op,t_index,t_count){
	if(!t_op.m_material.p_Bind()){
		return;
	}
	if(t_op.m_blend!=bb_graphics2_rs_blend){
		bb_graphics2_rs_blend=t_op.m_blend;
		var t_4=bb_graphics2_rs_blend;
		if(t_4==0){
			gl.disable(3042);
		}else{
			if(t_4==1){
				gl.enable(3042);
				gl.blendFunc(1,771);
			}else{
				if(t_4==2){
					gl.enable(3042);
					gl.blendFunc(1,1);
				}else{
					if(t_4==3){
						gl.enable(3042);
						gl.blendFunc(774,771);
					}else{
						if(t_4==4){
							gl.enable(3042);
							gl.blendFunc(774,0);
						}
					}
				}
			}
		}
	}
	var t_5=t_op.m_order;
	if(t_5==1){
		gl.drawArrays(0,t_index,t_count);
	}else{
		if(t_5==2){
			gl.drawArrays(1,t_index,t_count);
		}else{
			if(t_5==3){
				gl.drawArrays(4,t_index,t_count);
			}else{
				if(t_5==4){
					gl.drawElements(4,((t_count/4)|0)*6,5123,(((t_index/4)|0)*6+(t_index&3)*4914)*2);
				}else{
					var t_j=0;
					while(t_j<t_count){
						gl.drawArrays(6,t_index+t_j,t_op.m_order);
						t_j+=t_op.m_order;
					}
				}
			}
		}
	}
}
c_DrawList.prototype.p_Render2=function(){
	if(!((this.m__next)!=0)){
		return;
	}
	var t_offset=0;
	var t_opid=0;
	var t_ops=this.m__ops.p_Data();
	var t_length=this.m__ops.p_Length2();
	while(t_offset<this.m__next){
		var t_size=this.m__next-t_offset;
		var t_lastop=t_length;
		if(t_size>65520){
			t_size=0;
			t_lastop=t_opid;
			while(t_lastop<t_length){
				var t_op=t_ops[t_lastop];
				var t_n=t_op.m_count*20;
				if(t_size+t_n>65520){
					break;
				}
				t_size+=t_n;
				t_lastop+=1;
			}
			if(!((t_size)!=0)){
				var t_op2=t_ops[t_opid];
				var t_count=t_op2.m_count;
				while((t_count)!=0){
					var t_n2=t_count;
					if(t_n2>3276){
						t_n2=((3276/t_op2.m_order)|0)*t_op2.m_order;
					}
					var t_size2=t_n2*20;
					if(true){
						_glBufferData(34962,65520,null,35040);
					}
					_glBufferSubData(34962,0,t_size2,this.m__data,t_offset);
					this.p_Render(t_op2,0,t_n2);
					t_offset+=t_size2;
					t_count-=t_n2;
				}
				t_opid+=1;
				continue;
			}
		}
		if(true){
			_glBufferData(34962,65520,null,35040);
		}
		_glBufferSubData(34962,0,t_size,this.m__data,t_offset);
		var t_index=0;
		while(t_opid<t_lastop){
			var t_op3=t_ops[t_opid];
			this.p_Render(t_op3,t_index,t_op3.m_count);
			t_index+=t_op3.m_count;
			t_opid+=1;
		}
		t_offset+=t_size;
	}
	gl.getError();
}
c_DrawList.prototype.p_Reset=function(){
	this.m__next=0;
	var t_data=this.m__ops.p_Data();
	for(var t_i=0;t_i<this.m__ops.p_Length2();t_i=t_i+1){
		t_data[t_i].m_material=null;
		bb_graphics2_freeOps.p_Push7(t_data[t_i]);
	}
	this.m__ops.p_Clear2();
	this.m__op=bb_graphics2_nullOp;
	this.m__casters.p_Clear2();
	this.m__casterVerts.p_Clear2();
}
c_DrawList.prototype.p_Flush=function(){
	this.p_Render2();
	this.p_Reset();
}
c_DrawList.prototype.p_BeginPrim=function(t_material,t_order){
	if(!((t_material)!=null)){
		t_material=this.m__defaultMaterial;
	}
	if(this.m__next+t_order*20>this.m__data.Length()){
		var t_newsize=bb_math_Max(this.m__data.Length()+((this.m__data.Length()/2)|0),this.m__next+t_order*20);
		var t_data=c_DataBuffer.m_new.call(new c_DataBuffer,t_newsize);
		this.m__data.p_CopyBytes(0,t_data,0,this.m__next);
		this.m__data.Discard();
		this.m__data=t_data;
	}
	if(t_material==this.m__op.m_material && this.m__blend==this.m__op.m_blend && t_order==this.m__op.m_order){
		this.m__op.m_count+=t_order;
		return;
	}
	if((bb_graphics2_freeOps.p_Length2())!=0){
		this.m__op=bb_graphics2_freeOps.p_Pop();
	}else{
		this.m__op=c_DrawOp.m_new.call(new c_DrawOp);
	}
	this.m__ops.p_Push7(this.m__op);
	this.m__op.m_material=t_material;
	this.m__op.m_blend=this.m__blend;
	this.m__op.m_order=t_order;
	this.m__op.m_count=t_order;
}
c_DrawList.prototype.p_PrimVert=function(t_x0,t_y0,t_s0,t_t0){
	this.m__data.PokeFloat(this.m__next+0,t_x0*this.m__ix+t_y0*this.m__jx+this.m__tx);
	this.m__data.PokeFloat(this.m__next+4,t_x0*this.m__iy+t_y0*this.m__jy+this.m__ty);
	this.m__data.PokeFloat(this.m__next+8,t_s0);
	this.m__data.PokeFloat(this.m__next+12,t_t0);
	this.m__data.PokeInt(this.m__next+16,this.m__pmcolor);
	this.m__next+=20;
}
c_DrawList.prototype.p_AddShadowCaster=function(t_caster){
	this.m__casters.p_Push10(t_caster);
	var t_verts=t_caster.m__verts;
	for(var t_i=0;t_i<t_verts.length-1;t_i=t_i+2){
		var t_x0=t_verts[t_i];
		var t_y0=t_verts[t_i+1];
		this.m__casterVerts.p_Push13(t_x0*this.m__ix+t_y0*this.m__jx+this.m__tx);
		this.m__casterVerts.p_Push13(t_x0*this.m__iy+t_y0*this.m__jy+this.m__ty);
	}
}
c_DrawList.prototype.p_PushMatrix=function(){
	this.m__matStack[this.m__matSp+0]=this.m__ix;
	this.m__matStack[this.m__matSp+1]=this.m__iy;
	this.m__matStack[this.m__matSp+2]=this.m__jx;
	this.m__matStack[this.m__matSp+3]=this.m__jy;
	this.m__matStack[this.m__matSp+4]=this.m__tx;
	this.m__matStack[this.m__matSp+5]=this.m__ty;
	this.m__matSp+=6;
	if(this.m__matSp>=this.m__matStack.length){
		this.m__matSp-=this.m__matStack.length;
	}
}
c_DrawList.prototype.p_SetMatrix=function(t_ix,t_iy,t_jx,t_jy,t_tx,t_ty){
	this.m__ix=t_ix;
	this.m__iy=t_iy;
	this.m__jx=t_jx;
	this.m__jy=t_jy;
	this.m__tx=t_tx;
	this.m__ty=t_ty;
}
c_DrawList.prototype.p_Transform=function(t_ix,t_iy,t_jx,t_jy,t_tx,t_ty){
	var t_ix2=t_ix*this.m__ix+t_iy*this.m__jx;
	var t_iy2=t_ix*this.m__iy+t_iy*this.m__jy;
	var t_jx2=t_jx*this.m__ix+t_jy*this.m__jx;
	var t_jy2=t_jx*this.m__iy+t_jy*this.m__jy;
	var t_tx2=t_tx*this.m__ix+t_ty*this.m__jx+this.m__tx;
	var t_ty2=t_tx*this.m__iy+t_ty*this.m__jy+this.m__ty;
	this.p_SetMatrix(t_ix2,t_iy2,t_jx2,t_jy2,t_tx2,t_ty2);
}
c_DrawList.prototype.p_Translate=function(t_tx,t_ty){
	this.p_Transform(1.0,0.0,0.0,1.0,t_tx,t_ty);
}
c_DrawList.prototype.p_Rotate=function(t_rz){
	this.p_Transform(Math.cos((t_rz)*D2R),-Math.sin((t_rz)*D2R),Math.sin((t_rz)*D2R),Math.cos((t_rz)*D2R),0.0,0.0);
	return 0;
}
c_DrawList.prototype.p_TranslateRotate=function(t_tx,t_ty,t_rz){
	this.p_Translate(t_tx,t_ty);
	this.p_Rotate(t_rz);
}
c_DrawList.prototype.p_Scale=function(t_sx,t_sy){
	this.p_Transform(t_sx,0.0,0.0,t_sy,0.0,0.0);
}
c_DrawList.prototype.p_TranslateRotateScale=function(t_tx,t_ty,t_rz,t_sx,t_sy){
	this.p_Translate(t_tx,t_ty);
	this.p_Rotate(t_rz);
	this.p_Scale(t_sx,t_sy);
}
c_DrawList.prototype.p_PopMatrix=function(){
	this.m__matSp-=6;
	if(this.m__matSp<0){
		this.m__matSp+=this.m__matStack.length;
	}
	this.m__ix=this.m__matStack[this.m__matSp+0];
	this.m__iy=this.m__matStack[this.m__matSp+1];
	this.m__jx=this.m__matStack[this.m__matSp+2];
	this.m__jy=this.m__matStack[this.m__matSp+3];
	this.m__tx=this.m__matStack[this.m__matSp+4];
	this.m__ty=this.m__matStack[this.m__matSp+5];
}
c_DrawList.prototype.p_AddShadowCaster2=function(t_caster,t_tx,t_ty,t_rz,t_sx,t_sy){
	this.p_PushMatrix();
	this.p_TranslateRotateScale(t_tx,t_ty,t_rz,t_sx,t_sy);
	this.p_AddShadowCaster(t_caster);
	this.p_PopMatrix();
}
c_DrawList.prototype.p_AddShadowCaster3=function(t_caster,t_tx,t_ty,t_rz){
	this.p_PushMatrix();
	this.p_TranslateRotate(t_tx,t_ty,t_rz);
	this.p_AddShadowCaster(t_caster);
	this.p_PopMatrix();
}
c_DrawList.prototype.p_AddShadowCaster4=function(t_caster,t_tx,t_ty){
	this.p_PushMatrix();
	this.p_Translate(t_tx,t_ty);
	this.p_AddShadowCaster(t_caster);
	this.p_PopMatrix();
}
c_DrawList.prototype.p_DrawImage=function(t_image){
	this.p_BeginPrim(t_image.m__material,4);
	this.p_PrimVert(t_image.m__x0,t_image.m__y0,t_image.m__s0,t_image.m__t0);
	this.p_PrimVert(t_image.m__x1,t_image.m__y0,t_image.m__s1,t_image.m__t0);
	this.p_PrimVert(t_image.m__x1,t_image.m__y1,t_image.m__s1,t_image.m__t1);
	this.p_PrimVert(t_image.m__x0,t_image.m__y1,t_image.m__s0,t_image.m__t1);
	if((t_image.m__caster)!=null){
		this.p_AddShadowCaster(t_image.m__caster);
	}
}
c_DrawList.prototype.p_DrawImage2=function(t_image,t_tx,t_ty,t_rz,t_sx,t_sy){
	this.p_PushMatrix();
	this.p_TranslateRotateScale(t_tx,t_ty,t_rz,t_sx,t_sy);
	this.p_DrawImage(t_image);
	this.p_PopMatrix();
}
c_DrawList.prototype.p_DrawImage3=function(t_image,t_tx,t_ty,t_rz){
	this.p_PushMatrix();
	this.p_TranslateRotate(t_tx,t_ty,t_rz);
	this.p_DrawImage(t_image);
	this.p_PopMatrix();
}
c_DrawList.prototype.p_DrawImage4=function(t_image,t_tx,t_ty){
	this.p_PushMatrix();
	this.p_Translate(t_tx,t_ty);
	this.p_DrawImage(t_image);
	this.p_PopMatrix();
}
c_DrawList.prototype.p_SetAlpha=function(t_a){
	this.m__color[3]=t_a;
	this.m__alpha=t_a*255.0;
	this.m__pmcolor=((this.m__alpha)|0)<<24|((this.m__color[2]*this.m__alpha)|0)<<16|((this.m__color[1]*this.m__alpha)|0)<<8|((this.m__color[0]*this.m__alpha)|0);
}
c_DrawList.prototype.p_SetColor=function(t_r,t_g,t_b){
	this.m__color[0]=t_r;
	this.m__color[1]=t_g;
	this.m__color[2]=t_b;
	this.m__pmcolor=((this.m__alpha)|0)<<24|((this.m__color[2]*this.m__alpha)|0)<<16|((this.m__color[1]*this.m__alpha)|0)<<8|((this.m__color[0]*this.m__alpha)|0);
}
c_DrawList.prototype.p_SetColor2=function(t_r,t_g,t_b,t_a){
	this.m__color[0]=t_r;
	this.m__color[1]=t_g;
	this.m__color[2]=t_b;
	this.m__color[3]=t_a;
	this.m__alpha=t_a*255.0;
	this.m__pmcolor=((this.m__alpha)|0)<<24|((this.m__color[2]*this.m__alpha)|0)<<16|((this.m__color[1]*this.m__alpha)|0)<<8|((this.m__color[0]*this.m__alpha)|0);
}
c_DrawList.prototype.p_DrawOval=function(t_x,t_y,t_width,t_height,t_material){
	var t_xr=t_width/2.0;
	var t_yr=t_height/2.0;
	var t_dx_x=t_xr*this.m__ix;
	var t_dx_y=t_xr*this.m__iy;
	var t_dy_x=t_yr*this.m__jx;
	var t_dy_y=t_yr*this.m__jy;
	var t_dx=Math.sqrt(t_dx_x*t_dx_x+t_dx_y*t_dx_y);
	var t_dy=Math.sqrt(t_dy_x*t_dy_x+t_dy_y*t_dy_y);
	var t_n=((t_dx+t_dy)|0);
	if(t_n<12){
		t_n=12;
	}else{
		if(t_n>3276){
			t_n=3276;
		}else{
			t_n&=-4;
		}
	}
	var t_x0=t_x+t_xr;
	var t_y0=((t_y+t_yr)|0);
	this.p_BeginPrim(t_material,t_n);
	for(var t_i=0;t_i<t_n;t_i=t_i+1){
		var t_th=(t_i)*360.0/(t_n);
		var t_px=t_x0+Math.cos((t_th)*D2R)*t_xr;
		var t_py=(t_y0)+Math.sin((t_th)*D2R)*t_yr;
		this.p_PrimVert(t_px,t_py,0.0,0.0);
	}
}
c_DrawList.prototype.p_DrawCircle=function(t_x,t_y,t_r,t_material){
	this.p_DrawOval(t_x-t_r,t_y-t_r,t_r*2.0,t_r*2.0,t_material);
}
c_DrawList.prototype.p_DrawRect=function(t_x0,t_y0,t_width,t_height,t_material,t_s0,t_t0,t_s1,t_t1){
	var t_x1=t_x0+t_width;
	var t_y1=t_y0+t_height;
	this.p_BeginPrim(t_material,4);
	this.p_PrimVert(t_x0,t_y0,t_s0,t_t0);
	this.p_PrimVert(t_x1,t_y0,t_s1,t_t0);
	this.p_PrimVert(t_x1,t_y1,t_s1,t_t1);
	this.p_PrimVert(t_x0,t_y1,t_s0,t_t1);
}
c_DrawList.prototype.p_DrawRect2=function(t_x0,t_y0,t_width,t_height,t_image,t_sourceX,t_sourceY,t_sourceWidth,t_sourceHeight){
	var t_material=t_image.m__material;
	var t_s0=(t_image.m__x+t_sourceX)/(t_material.p_Width());
	var t_t0=(t_image.m__y+t_sourceY)/(t_material.p_Height());
	var t_s1=(t_image.m__x+t_sourceX+t_sourceWidth)/(t_material.p_Width());
	var t_t1=(t_image.m__y+t_sourceY+t_sourceHeight)/(t_material.p_Height());
	this.p_DrawRect(t_x0,t_y0,t_width,t_height,t_material,t_s0,t_t0,t_s1,t_t1);
}
c_DrawList.prototype.p_DrawRect3=function(t_x,t_y,t_image,t_sourceX,t_sourceY,t_sourceWidth,t_sourceHeight){
	this.p_DrawRect2(t_x,t_y,(t_sourceWidth),(t_sourceHeight),t_image,t_sourceX,t_sourceY,t_sourceWidth,t_sourceHeight);
}
c_DrawList.prototype.p_DrawRect4=function(t_x0,t_y0,t_width,t_height,t_image){
	this.p_DrawRect(t_x0,t_y0,t_width,t_height,t_image.m__material,t_image.m__s0,t_image.m__t0,t_image.m__s1,t_image.m__t1);
}
function c_Canvas(){
	c_DrawList.call(this);
	this.m__dirty=-1;
	this.m__lights=new_object_array(4);
	this.m__seq=0;
	this.m__texture=null;
	this.m__width=0;
	this.m__height=0;
	this.m__twidth=0;
	this.m__theight=0;
	this.m__image=null;
	this.m__viewport=[0,0,640,480];
	this.m__vpx=0;
	this.m__vpy=0;
	this.m__vpw=0;
	this.m__vph=0;
	this.m__scissor=[0,0,10000,10000];
	this.m__scx=0;
	this.m__scy=0;
	this.m__scw=0;
	this.m__sch=0;
	this.m__clsScissor=false;
	this.m__projMatrix=bb_math3d_Mat4New();
	this.m__viewMatrix=bb_math3d_Mat4New();
	this.m__modelMatrix=bb_math3d_Mat4New();
	this.m__ambientLight=[0.0,0.0,0.0,1.0];
	this.m__fogColor=[0.0,0.0,0.0,0.0];
	this.m__shadowMap=null;
	this.m__lineWidth=1.0;
	this.m__colorMask=[true,true,true,true];
}
c_Canvas.prototype=extend_class(c_DrawList);
c_Canvas.prototype.p_Init3=function(){
	bb_graphics2_Init();
	this.m__dirty=-1;
	for(var t_i=0;t_i<4;t_i=t_i+1){
		this.m__lights[t_i]=c_LightData.m_new.call(new c_LightData);
	}
}
c_Canvas.m__active=null;
c_Canvas.prototype.p_Flush=function(){
	this.p_FlushPrims();
	if(!((this.m__texture)!=null)){
		return;
	}
	if((this.m__texture.m__flags&256)!=0){
		this.p_Validate();
		gl.disable(3089);
		gl.viewport(0,0,this.m__twidth,this.m__theight);
		if(this.m__width==this.m__twidth && this.m__height==this.m__theight){
			_glReadPixels(0,0,this.m__twidth,this.m__theight,6408,5121,object_downcast((this.m__texture.m__data),c_DataBuffer),0);
		}else{
			for(var t_y=0;t_y<this.m__height;t_y=t_y+1){
				_glReadPixels(this.m__image.m__x,this.m__image.m__y+t_y,this.m__width,1,6408,5121,object_downcast((this.m__texture.m__data),c_DataBuffer),(this.m__image.m__y+t_y)*(this.m__twidth*4)+this.m__image.m__x*4);
			}
		}
		this.m__dirty|=2;
	}
	this.m__texture.p_UpdateMipmaps();
}
c_Canvas.prototype.p_Validate=function(){
	if(this.m__seq!=webglGraphicsSeq){
		this.m__seq=webglGraphicsSeq;
		bb_graphics2_InitVbos();
		if(!((this.m__texture)!=null)){
			this.m__width=bb_app_DeviceWidth();
			this.m__height=bb_app_DeviceHeight();
			this.m__twidth=this.m__width;
			this.m__theight=this.m__height;
		}
		this.m__dirty=-1;
	}
	if(c_Canvas.m__active==this){
		if(!((this.m__dirty)!=0)){
			return;
		}
	}else{
		if((c_Canvas.m__active)!=null){
			c_Canvas.m__active.p_Flush();
		}
		c_Canvas.m__active=this;
		this.m__dirty=-1;
	}
	if((this.m__dirty&1)!=0){
		if((this.m__texture)!=null){
			_glBindFramebuffer(36160,this.m__texture.p_GLFramebuffer());
		}else{
			_glBindFramebuffer(36160,bb_graphics2_defaultFbo);
		}
	}
	if((this.m__dirty&2)!=0){
		if(!((this.m__texture)!=null)){
			this.m__width=bb_app_DeviceWidth();
			this.m__height=bb_app_DeviceHeight();
			this.m__twidth=this.m__width;
			this.m__theight=this.m__height;
		}
		this.m__vpx=this.m__viewport[0];
		this.m__vpy=this.m__viewport[1];
		this.m__vpw=this.m__viewport[2];
		this.m__vph=this.m__viewport[3];
		if((this.m__image)!=null){
			this.m__vpx+=this.m__image.m__x;
			this.m__vpy+=this.m__image.m__y;
		}
		this.m__scx=this.m__scissor[0];
		this.m__scy=this.m__scissor[1];
		this.m__scw=this.m__scissor[2];
		this.m__sch=this.m__scissor[3];
		if(this.m__scx<0){
			this.m__scx=0;
		}else{
			if(this.m__scx>this.m__vpw){
				this.m__scx=this.m__vpw;
			}
		}
		if(this.m__scw<0){
			this.m__scw=0;
		}else{
			if(this.m__scx+this.m__scw>this.m__vpw){
				this.m__scw=this.m__vpw-this.m__scx;
			}
		}
		if(this.m__scy<0){
			this.m__scy=0;
		}else{
			if(this.m__scy>this.m__vph){
				this.m__scy=this.m__vph;
			}
		}
		if(this.m__sch<0){
			this.m__sch=0;
		}else{
			if(this.m__scy+this.m__sch>this.m__vph){
				this.m__sch=this.m__vph-this.m__scy;
			}
		}
		this.m__scx+=this.m__vpx;
		this.m__scy+=this.m__vpy;
		if(!((this.m__texture)!=null)){
			this.m__vpy=this.m__theight-this.m__vpy-this.m__vph;
			this.m__scy=this.m__theight-this.m__scy-this.m__sch;
		}
		gl.viewport(this.m__vpx,this.m__vpy,this.m__vpw,this.m__vph);
		if(this.m__scx!=this.m__vpx || this.m__scy!=this.m__vpy || this.m__scw!=this.m__vpw || this.m__sch!=this.m__vph){
			gl.enable(3089);
			gl.scissor(this.m__scx,this.m__scy,this.m__scw,this.m__sch);
			this.m__clsScissor=false;
		}else{
			gl.disable(3089);
			this.m__clsScissor=this.m__scx!=0 || this.m__scy!=0 || this.m__vpw!=this.m__twidth || this.m__vph!=this.m__theight;
		}
	}
	if((this.m__dirty&4)!=0){
		bb_graphics2_rs_program=null;
		if((this.m__texture)!=null){
			bb_graphics2_rs_clipPosScale[1]=1.0;
			bb_math3d_Mat4Copy(this.m__projMatrix,bb_graphics2_rs_projMatrix);
		}else{
			bb_graphics2_rs_clipPosScale[1]=-1.0;
			bb_math3d_Mat4Multiply(bb_graphics2_flipYMatrix,this.m__projMatrix,bb_graphics2_rs_projMatrix);
		}
		bb_math3d_Mat4Multiply(this.m__viewMatrix,this.m__modelMatrix,bb_graphics2_rs_modelViewMatrix);
		bb_math3d_Mat4Multiply(bb_graphics2_rs_projMatrix,bb_graphics2_rs_modelViewMatrix,bb_graphics2_rs_modelViewProjMatrix);
		bb_math3d_Vec4Copy(this.m__ambientLight,bb_graphics2_rs_ambientLight);
		bb_math3d_Vec4Copy(this.m__fogColor,bb_graphics2_rs_fogColor);
		bb_graphics2_rs_numLights=0;
		for(var t_i=0;t_i<4;t_i=t_i+1){
			var t_light=this.m__lights[t_i];
			if(!((t_light.m_type)!=0)){
				continue;
			}
			bb_math3d_Mat4Transform(this.m__viewMatrix,t_light.m_vector,t_light.m_tvector);
			bb_graphics2_rs_lightColors[bb_graphics2_rs_numLights*4+0]=t_light.m_color[0];
			bb_graphics2_rs_lightColors[bb_graphics2_rs_numLights*4+1]=t_light.m_color[1];
			bb_graphics2_rs_lightColors[bb_graphics2_rs_numLights*4+2]=t_light.m_color[2];
			bb_graphics2_rs_lightColors[bb_graphics2_rs_numLights*4+3]=t_light.m_color[3];
			bb_graphics2_rs_lightVectors[bb_graphics2_rs_numLights*4+0]=t_light.m_tvector[0];
			bb_graphics2_rs_lightVectors[bb_graphics2_rs_numLights*4+1]=t_light.m_tvector[1];
			bb_graphics2_rs_lightVectors[bb_graphics2_rs_numLights*4+2]=t_light.m_tvector[2];
			bb_graphics2_rs_lightVectors[bb_graphics2_rs_numLights*4+3]=t_light.m_range;
			bb_graphics2_rs_numLights+=1;
		}
		if((this.m__shadowMap)!=null){
			bb_graphics2_rs_shadowTexture=this.m__shadowMap.m__material.m__colorTexture;
		}else{
			bb_graphics2_rs_shadowTexture=null;
		}
		bb_graphics2_rs_blend=-1;
	}
	if((this.m__dirty&8)!=0){
		gl.lineWidth(this.m__lineWidth);
	}
	if((this.m__dirty&16)!=0){
		gl.colorMask(this.m__colorMask[0],this.m__colorMask[1],this.m__colorMask[2],this.m__colorMask[3]);
	}
	this.m__dirty=0;
}
c_Canvas.prototype.p_FlushPrims=function(){
	if(c_DrawList.prototype.p_IsEmpty.call(this)){
		return;
	}
	this.p_Validate();
	c_DrawList.prototype.p_Flush.call(this);
}
c_Canvas.prototype.p_SetRenderTarget=function(t_image){
	this.p_FlushPrims();
	if((t_image)!=null){
		this.m__image=t_image;
		this.m__texture=t_image.p_Material().p_ColorTexture();
		if(!((this.m__texture.p_Flags()&16)!=0)){
			error("Texture is not a render target texture");
		}
		this.m__width=this.m__image.p_Width();
		this.m__height=this.m__image.p_Height();
		this.m__twidth=this.m__texture.p_Width();
		this.m__theight=this.m__texture.p_Height();
	}else{
		this.m__image=null;
		this.m__texture=null;
		this.m__width=bb_app_DeviceWidth();
		this.m__height=bb_app_DeviceHeight();
		this.m__twidth=this.m__width;
		this.m__theight=this.m__height;
	}
	this.m__dirty=-1;
}
c_Canvas.prototype.p_SetViewport=function(t_x,t_y,t_w,t_h){
	this.p_FlushPrims();
	this.m__viewport[0]=t_x;
	this.m__viewport[1]=t_y;
	this.m__viewport[2]=t_w;
	this.m__viewport[3]=t_h;
	this.m__dirty|=2;
}
c_Canvas.prototype.p_SetProjection2d=function(t_left,t_right,t_top,t_bottom,t_znear,t_zfar){
	this.p_FlushPrims();
	bb_math3d_Mat4Ortho(t_left,t_right,t_top,t_bottom,t_znear,t_zfar,this.m__projMatrix);
	this.m__dirty|=4;
}
c_Canvas.m_new=function(t_image){
	c_DrawList.m_new.call(this);
	this.p_Init3();
	this.p_SetRenderTarget(t_image);
	this.p_SetViewport(0,0,this.m__width,this.m__height);
	this.p_SetProjection2d(0.0,(this.m__width),0.0,(this.m__height),-1.0,1.0);
	return this;
}
c_Canvas.prototype.p_Clear=function(t_r,t_g,t_b,t_a){
	this.p_FlushPrims();
	this.p_Validate();
	if(this.m__clsScissor){
		gl.enable(3089);
		gl.scissor(this.m__vpx,this.m__vpy,this.m__vpw,this.m__vph);
	}
	gl.clearColor(t_r,t_g,t_b,t_a);
	gl.clear(16384);
	if(this.m__clsScissor){
		gl.disable(3089);
	}
}
function c_Image2(){
	Object.call(this);
	this.m__material=null;
	this.m__width=0;
	this.m__height=0;
	this.m__x0=-1.0;
	this.m__x1=1.0;
	this.m__y0=-1.0;
	this.m__y1=1.0;
	this.m__x=0;
	this.m__s0=0.0;
	this.m__y=0;
	this.m__t0=0.0;
	this.m__s1=1.0;
	this.m__t1=1.0;
	this.m__caster=null;
}
c_Image2.prototype.p_SetHandle=function(t_xhandle,t_yhandle){
	this.m__x0=(this.m__width)*-t_xhandle;
	this.m__x1=(this.m__width)*(1.0-t_xhandle);
	this.m__y0=(this.m__height)*-t_yhandle;
	this.m__y1=(this.m__height)*(1.0-t_yhandle);
	this.m__s0=(this.m__x)/(this.m__material.p_Width());
	this.m__t0=(this.m__y)/(this.m__material.p_Height());
	this.m__s1=(this.m__x+this.m__width)/(this.m__material.p_Width());
	this.m__t1=(this.m__y+this.m__height)/(this.m__material.p_Height());
}
c_Image2.m_new=function(t_width,t_height,t_xhandle,t_yhandle,t_flags){
	var t_texture=c_Texture.m_new.call(new c_Texture,t_width,t_height,4,t_flags|12|16);
	this.m__material=c_Material.m_new.call(new c_Material,bb_graphics2_fastShader);
	this.m__material.p_SetTexture("ColorTexture",t_texture);
	this.m__width=t_width;
	this.m__height=t_height;
	this.p_SetHandle(t_xhandle,t_yhandle);
	return this;
}
c_Image2.m_new2=function(t_image,t_x,t_y,t_width,t_height,t_xhandle,t_yhandle){
	this.m__material=t_image.m__material;
	this.m__material.p_Retain();
	this.m__x=t_image.m__x+t_x;
	this.m__y=t_image.m__y+t_y;
	this.m__width=t_width;
	this.m__height=t_height;
	this.p_SetHandle(t_xhandle,t_yhandle);
	return this;
}
c_Image2.m_new3=function(t_material,t_xhandle,t_yhandle){
	var t_texture=t_material.p_ColorTexture();
	if(!((t_texture)!=null)){
		error("Material has no ColorTexture");
	}
	this.m__material=t_material;
	this.m__material.p_Retain();
	this.m__width=this.m__material.p_Width();
	this.m__height=this.m__material.p_Height();
	this.p_SetHandle(t_xhandle,t_yhandle);
	return this;
}
c_Image2.m_new4=function(t_material,t_x,t_y,t_width,t_height,t_xhandle,t_yhandle){
	var t_texture=t_material.p_ColorTexture();
	if(!((t_texture)!=null)){
		error("Material has no ColorTexture");
	}
	this.m__material=t_material;
	this.m__material.p_Retain();
	this.m__x=t_x;
	this.m__y=t_y;
	this.m__width=t_width;
	this.m__height=t_height;
	this.p_SetHandle(t_xhandle,t_yhandle);
	return this;
}
c_Image2.m_new5=function(){
	return this;
}
c_Image2.m_Load=function(t_path,t_xhandle,t_yhandle,t_flags,t_shader){
	var t_material=c_Material.m_Load(t_path,t_flags|12,t_shader);
	if(!((t_material)!=null)){
		return null;
	}
	return c_Image2.m_new3.call(new c_Image2,t_material,t_xhandle,t_yhandle);
}
c_Image2.prototype.p_Width=function(){
	return this.m__width;
}
c_Image2.prototype.p_Height=function(){
	return this.m__height;
}
c_Image2.prototype.p_Material=function(){
	return this.m__material;
}
var bb_graphics2_inited=false;
var bb_graphics2_vbosSeq=0;
var bb_graphics2_rs_vbo=0;
function c_DataBuffer(){
	BBDataBuffer.call(this);
}
c_DataBuffer.prototype=extend_class(BBDataBuffer);
c_DataBuffer.m_new=function(t_length){
	if(!this._New(t_length)){
		error("Allocate DataBuffer failed");
	}
	return this;
}
c_DataBuffer.m_new2=function(){
	return this;
}
c_DataBuffer.prototype.p_CopyBytes=function(t_address,t_dst,t_dstaddress,t_count){
	if(t_address+t_count>this.Length()){
		t_count=this.Length()-t_address;
	}
	if(t_dstaddress+t_count>t_dst.Length()){
		t_count=t_dst.Length()-t_dstaddress;
	}
	if(t_dstaddress<=t_address){
		for(var t_i=0;t_i<t_count;t_i=t_i+1){
			t_dst.PokeByte(t_dstaddress+t_i,this.PeekByte(t_address+t_i));
		}
	}else{
		for(var t_i2=t_count-1;t_i2>=0;t_i2=t_i2+-1){
			t_dst.PokeByte(t_dstaddress+t_i2,this.PeekByte(t_address+t_i2));
		}
	}
}
var bb_graphics2_rs_ibo=0;
function bb_graphics2_InitVbos(){
	if(bb_graphics2_vbosSeq==webglGraphicsSeq){
		return;
	}
	bb_graphics2_vbosSeq=webglGraphicsSeq;
	bb_graphics2_rs_vbo=gl.createBuffer();
	_glBindBuffer(34962,bb_graphics2_rs_vbo);
	_glBufferData(34962,65520,null,35040);
	gl.enableVertexAttribArray(0);
	gl.vertexAttribPointer(0,2,5126,false,20,0);
	gl.enableVertexAttribArray(1);
	gl.vertexAttribPointer(1,2,5126,false,20,8);
	gl.enableVertexAttribArray(2);
	gl.vertexAttribPointer(2,4,5121,true,20,16);
	bb_graphics2_rs_ibo=gl.createBuffer();
	_glBindBuffer(34963,bb_graphics2_rs_ibo);
	var t_idxs=c_DataBuffer.m_new.call(new c_DataBuffer,39312);
	for(var t_j=0;t_j<4;t_j=t_j+1){
		var t_k=t_j*4914*2;
		for(var t_i=0;t_i<819;t_i=t_i+1){
			t_idxs.PokeShort(t_i*12+t_k+0,t_i*4+t_j+0);
			t_idxs.PokeShort(t_i*12+t_k+2,t_i*4+t_j+1);
			t_idxs.PokeShort(t_i*12+t_k+4,t_i*4+t_j+2);
			t_idxs.PokeShort(t_i*12+t_k+6,t_i*4+t_j+0);
			t_idxs.PokeShort(t_i*12+t_k+8,t_i*4+t_j+2);
			t_idxs.PokeShort(t_i*12+t_k+10,t_i*4+t_j+3);
		}
	}
	_glBufferData(34963,t_idxs.Length(),t_idxs,35044);
	t_idxs.Discard();
}
var bb_graphics2_tmpi=[];
var bb_graphics2_defaultFbo=0;
function bb_app_LoadString(t_path){
	return bb_app__game.LoadString(bb_data_FixDataPath(t_path));
}
var bb_graphics2_mainShader="";
function c_Shader(){
	Object.call(this);
	this.m__source="";
	this.m__vsource="";
	this.m__fsource="";
	this.m__uniforms=c_StringSet.m_new.call(new c_StringSet);
	this.m__glPrograms=new_object_array(5);
	this.m__defaultMaterial=null;
	this.m__seq=0;
}
c_Shader.prototype.p_Build=function(t_numLights){
	var t_defs="";
	t_defs=t_defs+("#define NUM_LIGHTS "+String(t_numLights)+"\n");
	var t_vshader=bb_glutil_glCompile(35633,t_defs+this.m__vsource);
	var t_fshader=bb_glutil_glCompile(35632,t_defs+this.m__fsource);
	var t_program=gl.createProgram();
	gl.attachShader(t_program,t_vshader);
	gl.attachShader(t_program,t_fshader);
	gl.deleteShader(t_vshader);
	gl.deleteShader(t_fshader);
	gl.bindAttribLocation(t_program,0,"Position");
	gl.bindAttribLocation(t_program,1,"Texcoord0");
	gl.bindAttribLocation(t_program,2,"Color");
	bb_glutil_glLink(t_program);
	var t_matuniforms=c_Stack2.m_new.call(new c_Stack2);
	var t_size=new_number_array(1);
	var t_type=new_number_array(1);
	var t_name=new_string_array(1);
	_glGetProgramiv(t_program,35718,bb_graphics2_tmpi);
	for(var t_i=0;t_i<bb_graphics2_tmpi[0];t_i=t_i+1){
		_glGetActiveUniform(t_program,t_i,t_size,t_type,t_name);
		if(this.m__uniforms.p_Contains2(t_name[0])){
			var t_location=_glGetUniformLocation(t_program,t_name[0]);
			if(t_location==-1){
				continue;
			}
			t_matuniforms.p_Push4(c_GLUniform.m_new.call(new c_GLUniform,t_name[0],t_location,t_size[0],t_type[0]));
		}
	}
	return c_GLProgram.m_new.call(new c_GLProgram,t_program,t_matuniforms.p_ToArray());
}
c_Shader.prototype.p_Build2=function(){
	var t_p=c_GlslParser.m_new.call(new c_GlslParser,this.m__source);
	var t_vars=c_StringSet.m_new.call(new c_StringSet);
	while((t_p.p_Toke()).length!=0){
		if(t_p.p_CParse("uniform")){
			var t_ty=t_p.p_ParseType();
			var t_id=t_p.p_ParseIdent();
			t_p.p_Parse2(";");
			this.m__uniforms.p_Insert2(t_id);
			continue;
		}
		var t_id2=t_p.p_CParseIdent();
		if((t_id2).length!=0){
			if(string_startswith(t_id2,"gl_")){
				t_vars.p_Insert2("B3D_"+t_id2.toUpperCase());
			}else{
				if(string_startswith(t_id2,"b3d_")){
					t_vars.p_Insert2(t_id2.toUpperCase());
				}
			}
			continue;
		}
		t_p.p_Bump();
	}
	var t_vardefs="";
	var t_=t_vars.p_ObjectEnumerator();
	while(t_.p_HasNext()){
		var t_var=t_.p_NextObject();
		t_vardefs=t_vardefs+("#define "+t_var+" 1\n");
	}
	var t_source=bb_graphics2_mainShader;
	var t_i0=t_source.indexOf("//@vertex",0);
	if(t_i0==-1){
		error("Can't find //@vertex chunk");
	}
	var t_i1=t_source.indexOf("//@fragment",0);
	if(t_i1==-1){
		error("Can't find //@fragment chunk");
	}
	var t_header=t_vardefs+t_source.slice(0,t_i0);
	this.m__vsource=t_header+t_source.slice(t_i0,t_i1);
	this.m__fsource=t_header+string_replace(t_source.slice(t_i1),"${SHADER}",this.m__source);
	for(var t_numLights=0;t_numLights<=4;t_numLights=t_numLights+1){
		this.m__glPrograms[t_numLights]=this.p_Build(t_numLights);
		if(((t_numLights)!=0) || t_vars.p_Contains2("B3D_DIFFUSE") || t_vars.p_Contains2("B3D_SPECULAR")){
			continue;
		}
		for(var t_i=1;t_i<=4;t_i=t_i+1){
			this.m__glPrograms[t_i]=this.m__glPrograms[0];
		}
		break;
	}
}
c_Shader.prototype.p_Build3=function(t_source){
	this.m__source=t_source;
	this.p_Build2();
}
c_Shader.m_new=function(t_source){
	this.p_Build3(t_source);
	return this;
}
c_Shader.m_new2=function(){
	return this;
}
c_Shader.prototype.p_OnInitMaterial=function(t_material){
	t_material.p_SetTexture("ColorTexture",c_Texture.m_White());
}
c_Shader.prototype.p_OnLoadMaterial=function(t_material,t_path,t_texFlags){
	var t_texture=c_Texture.m_Load(t_path,4,t_texFlags);
	if(!((t_texture)!=null)){
		return null;
	}
	t_material.p_SetTexture("ColorTexture",t_texture);
	if((t_texture)!=null){
		t_texture.p_Release();
	}
	return t_material;
}
c_Shader.prototype.p_DefaultMaterial=function(){
	if(!((this.m__defaultMaterial)!=null)){
		this.m__defaultMaterial=c_Material.m_new.call(new c_Material,this);
	}
	return this.m__defaultMaterial;
}
c_Shader.prototype.p_GLProgram=function(){
	if(this.m__seq!=webglGraphicsSeq){
		this.m__seq=webglGraphicsSeq;
		bb_graphics2_rs_program=null;
		this.p_Build2();
	}
	return this.m__glPrograms[bb_graphics2_rs_numLights];
}
c_Shader.prototype.p_Bind=function(){
	var t_program=this.p_GLProgram();
	if(t_program==bb_graphics2_rs_program){
		return;
	}
	bb_graphics2_rs_program=t_program;
	bb_graphics2_rs_material=null;
	t_program.p_Bind();
}
function c_GLProgram(){
	Object.call(this);
	this.m_program=0;
	this.m_matuniforms=[];
	this.m_mvpMatrix=0;
	this.m_mvMatrix=0;
	this.m_clipPosScale=0;
	this.m_globalColor=0;
	this.m_fogColor=0;
	this.m_ambientLight=0;
	this.m_lightColors=0;
	this.m_lightVectors=0;
	this.m_shadowTexture=0;
}
c_GLProgram.m_new=function(t_program,t_matuniforms){
	this.m_program=t_program;
	this.m_matuniforms=t_matuniforms;
	this.m_mvpMatrix=_glGetUniformLocation(t_program,"ModelViewProjectionMatrix");
	this.m_mvMatrix=_glGetUniformLocation(t_program,"ModelViewMatrix");
	this.m_clipPosScale=_glGetUniformLocation(t_program,"ClipPosScale");
	this.m_globalColor=_glGetUniformLocation(t_program,"GlobalColor");
	this.m_fogColor=_glGetUniformLocation(t_program,"FogColor");
	this.m_ambientLight=_glGetUniformLocation(t_program,"AmbientLight");
	this.m_lightColors=_glGetUniformLocation(t_program,"LightColors");
	this.m_lightVectors=_glGetUniformLocation(t_program,"LightVectors");
	this.m_shadowTexture=_glGetUniformLocation(t_program,"ShadowTexture");
	return this;
}
c_GLProgram.m_new2=function(){
	return this;
}
c_GLProgram.prototype.p_Bind=function(){
	gl.useProgram(this.m_program);
	if(this.m_mvpMatrix!=-1){
		_glUniformMatrix4fv(this.m_mvpMatrix,1,false,bb_graphics2_rs_modelViewProjMatrix);
	}
	if(this.m_mvMatrix!=-1){
		_glUniformMatrix4fv(this.m_mvMatrix,1,false,bb_graphics2_rs_modelViewMatrix);
	}
	if(this.m_clipPosScale!=-1){
		_glUniform4fv(this.m_clipPosScale,1,bb_graphics2_rs_clipPosScale);
	}
	if(this.m_globalColor!=-1){
		_glUniform4fv(this.m_globalColor,1,bb_graphics2_rs_globalColor);
	}
	if(this.m_fogColor!=-1){
		_glUniform4fv(this.m_fogColor,1,bb_graphics2_rs_fogColor);
	}
	if(this.m_ambientLight!=-1){
		_glUniform4fv(this.m_ambientLight,1,bb_graphics2_rs_ambientLight);
	}
	if(this.m_lightColors!=-1){
		_glUniform4fv(this.m_lightColors,bb_graphics2_rs_numLights,bb_graphics2_rs_lightColors);
	}
	if(this.m_lightVectors!=-1){
		_glUniform4fv(this.m_lightVectors,bb_graphics2_rs_numLights,bb_graphics2_rs_lightVectors);
	}
	if(this.m_shadowTexture!=-1){
		var t_tex=bb_graphics2_rs_shadowTexture;
		if(!((t_tex)!=null)){
			t_tex=c_Texture.m_White();
		}
		gl.activeTexture(33991);
		_glBindTexture(3553,t_tex.p_GLTexture());
		gl.activeTexture(33984);
		gl.uniform1i(this.m_shadowTexture,7);
	}
}
var bb_glutil_tmpi=[];
function bb_glutil_glCompile(t_type,t_source){
	t_source="precision mediump float;\n"+t_source;
	var t_shader=gl.createShader(t_type);
	gl.shaderSource(t_shader,t_source);
	gl.compileShader(t_shader);
	_glGetShaderiv(t_shader,35713,bb_glutil_tmpi);
	if(!((bb_glutil_tmpi[0])!=0)){
		print("Failed to compile fragment shader:"+gl.getShaderInfoLog(t_shader));
		var t_lines=t_source.split("\n");
		for(var t_i=0;t_i<t_lines.length;t_i=t_i+1){
			print(String(t_i+1)+":\t"+t_lines[t_i]);
		}
		error("Compile fragment shader failed");
	}
	return t_shader;
}
function bb_glutil_glLink(t_program){
	gl.linkProgram(t_program);
	_glGetProgramiv(t_program,35714,bb_glutil_tmpi);
	if(!((bb_glutil_tmpi[0])!=0)){
		error("Failed to link program:"+gl.getProgramInfoLog(t_program));
	}
}
function c_GLUniform(){
	Object.call(this);
	this.m_name="";
	this.m_location=0;
	this.m_size=0;
	this.m_type=0;
}
c_GLUniform.m_new=function(t_name,t_location,t_size,t_type){
	this.m_name=t_name;
	this.m_location=t_location;
	this.m_size=t_size;
	this.m_type=t_type;
	return this;
}
c_GLUniform.m_new2=function(){
	return this;
}
function c_Stack2(){
	Object.call(this);
	this.m_data=[];
	this.m_length=0;
}
c_Stack2.m_new=function(){
	return this;
}
c_Stack2.m_new2=function(t_data){
	this.m_data=t_data.slice(0);
	this.m_length=t_data.length;
	return this;
}
c_Stack2.prototype.p_Push4=function(t_value){
	if(this.m_length==this.m_data.length){
		this.m_data=resize_object_array(this.m_data,this.m_length*2+10);
	}
	this.m_data[this.m_length]=t_value;
	this.m_length+=1;
}
c_Stack2.prototype.p_Push5=function(t_values,t_offset,t_count){
	for(var t_i=0;t_i<t_count;t_i=t_i+1){
		this.p_Push4(t_values[t_offset+t_i]);
	}
}
c_Stack2.prototype.p_Push6=function(t_values,t_offset){
	this.p_Push5(t_values,t_offset,t_values.length-t_offset);
}
c_Stack2.prototype.p_ToArray=function(){
	var t_t=new_object_array(this.m_length);
	for(var t_i=0;t_i<this.m_length;t_i=t_i+1){
		t_t[t_i]=this.m_data[t_i];
	}
	return t_t;
}
function c_Set(){
	Object.call(this);
	this.m_map=null;
}
c_Set.m_new=function(t_map){
	this.m_map=t_map;
	return this;
}
c_Set.m_new2=function(){
	return this;
}
c_Set.prototype.p_Contains2=function(t_value){
	return this.m_map.p_Contains2(t_value);
}
c_Set.prototype.p_Insert2=function(t_value){
	this.m_map.p_Insert3(t_value,null);
	return 0;
}
c_Set.prototype.p_ObjectEnumerator=function(){
	return this.m_map.p_Keys().p_ObjectEnumerator();
}
function c_StringSet(){
	c_Set.call(this);
}
c_StringSet.prototype=extend_class(c_Set);
c_StringSet.m_new=function(){
	c_Set.m_new.call(this,(c_StringMap.m_new.call(new c_StringMap)));
	return this;
}
function c_Map2(){
	Object.call(this);
	this.m_root=null;
}
c_Map2.m_new=function(){
	return this;
}
c_Map2.prototype.p_Compare2=function(t_lhs,t_rhs){
}
c_Map2.prototype.p_FindNode2=function(t_key){
	var t_node=this.m_root;
	while((t_node)!=null){
		var t_cmp=this.p_Compare2(t_key,t_node.m_key);
		if(t_cmp>0){
			t_node=t_node.m_right;
		}else{
			if(t_cmp<0){
				t_node=t_node.m_left;
			}else{
				return t_node;
			}
		}
	}
	return t_node;
}
c_Map2.prototype.p_Contains2=function(t_key){
	return this.p_FindNode2(t_key)!=null;
}
c_Map2.prototype.p_RotateLeft2=function(t_node){
	var t_child=t_node.m_right;
	t_node.m_right=t_child.m_left;
	if((t_child.m_left)!=null){
		t_child.m_left.m_parent=t_node;
	}
	t_child.m_parent=t_node.m_parent;
	if((t_node.m_parent)!=null){
		if(t_node==t_node.m_parent.m_left){
			t_node.m_parent.m_left=t_child;
		}else{
			t_node.m_parent.m_right=t_child;
		}
	}else{
		this.m_root=t_child;
	}
	t_child.m_left=t_node;
	t_node.m_parent=t_child;
	return 0;
}
c_Map2.prototype.p_RotateRight2=function(t_node){
	var t_child=t_node.m_left;
	t_node.m_left=t_child.m_right;
	if((t_child.m_right)!=null){
		t_child.m_right.m_parent=t_node;
	}
	t_child.m_parent=t_node.m_parent;
	if((t_node.m_parent)!=null){
		if(t_node==t_node.m_parent.m_right){
			t_node.m_parent.m_right=t_child;
		}else{
			t_node.m_parent.m_left=t_child;
		}
	}else{
		this.m_root=t_child;
	}
	t_child.m_right=t_node;
	t_node.m_parent=t_child;
	return 0;
}
c_Map2.prototype.p_InsertFixup2=function(t_node){
	while(((t_node.m_parent)!=null) && t_node.m_parent.m_color==-1 && ((t_node.m_parent.m_parent)!=null)){
		if(t_node.m_parent==t_node.m_parent.m_parent.m_left){
			var t_uncle=t_node.m_parent.m_parent.m_right;
			if(((t_uncle)!=null) && t_uncle.m_color==-1){
				t_node.m_parent.m_color=1;
				t_uncle.m_color=1;
				t_uncle.m_parent.m_color=-1;
				t_node=t_uncle.m_parent;
			}else{
				if(t_node==t_node.m_parent.m_right){
					t_node=t_node.m_parent;
					this.p_RotateLeft2(t_node);
				}
				t_node.m_parent.m_color=1;
				t_node.m_parent.m_parent.m_color=-1;
				this.p_RotateRight2(t_node.m_parent.m_parent);
			}
		}else{
			var t_uncle2=t_node.m_parent.m_parent.m_left;
			if(((t_uncle2)!=null) && t_uncle2.m_color==-1){
				t_node.m_parent.m_color=1;
				t_uncle2.m_color=1;
				t_uncle2.m_parent.m_color=-1;
				t_node=t_uncle2.m_parent;
			}else{
				if(t_node==t_node.m_parent.m_left){
					t_node=t_node.m_parent;
					this.p_RotateRight2(t_node);
				}
				t_node.m_parent.m_color=1;
				t_node.m_parent.m_parent.m_color=-1;
				this.p_RotateLeft2(t_node.m_parent.m_parent);
			}
		}
	}
	this.m_root.m_color=1;
	return 0;
}
c_Map2.prototype.p_Set2=function(t_key,t_value){
	var t_node=this.m_root;
	var t_parent=null;
	var t_cmp=0;
	while((t_node)!=null){
		t_parent=t_node;
		t_cmp=this.p_Compare2(t_key,t_node.m_key);
		if(t_cmp>0){
			t_node=t_node.m_right;
		}else{
			if(t_cmp<0){
				t_node=t_node.m_left;
			}else{
				t_node.m_value=t_value;
				return false;
			}
		}
	}
	t_node=c_Node2.m_new.call(new c_Node2,t_key,t_value,-1,t_parent);
	if((t_parent)!=null){
		if(t_cmp>0){
			t_parent.m_right=t_node;
		}else{
			t_parent.m_left=t_node;
		}
		this.p_InsertFixup2(t_node);
	}else{
		this.m_root=t_node;
	}
	return true;
}
c_Map2.prototype.p_Insert3=function(t_key,t_value){
	return this.p_Set2(t_key,t_value);
}
c_Map2.prototype.p_Keys=function(){
	return c_MapKeys.m_new.call(new c_MapKeys,this);
}
c_Map2.prototype.p_FirstNode=function(){
	if(!((this.m_root)!=null)){
		return null;
	}
	var t_node=this.m_root;
	while((t_node.m_left)!=null){
		t_node=t_node.m_left;
	}
	return t_node;
}
function c_StringMap(){
	c_Map2.call(this);
}
c_StringMap.prototype=extend_class(c_Map2);
c_StringMap.m_new=function(){
	c_Map2.m_new.call(this);
	return this;
}
c_StringMap.prototype.p_Compare2=function(t_lhs,t_rhs){
	return string_compare(t_lhs,t_rhs);
}
function c_Node2(){
	Object.call(this);
	this.m_key="";
	this.m_right=null;
	this.m_left=null;
	this.m_value=null;
	this.m_color=0;
	this.m_parent=null;
}
c_Node2.m_new=function(t_key,t_value,t_color,t_parent){
	this.m_key=t_key;
	this.m_value=t_value;
	this.m_color=t_color;
	this.m_parent=t_parent;
	return this;
}
c_Node2.m_new2=function(){
	return this;
}
c_Node2.prototype.p_NextNode=function(){
	var t_node=null;
	if((this.m_right)!=null){
		t_node=this.m_right;
		while((t_node.m_left)!=null){
			t_node=t_node.m_left;
		}
		return t_node;
	}
	t_node=this;
	var t_parent=this.m_parent;
	while(((t_parent)!=null) && t_node==t_parent.m_right){
		t_node=t_parent;
		t_parent=t_parent.m_parent;
	}
	return t_parent;
}
function c_Parser(){
	Object.call(this);
	this.m__text="";
	this.m__pos=0;
	this.m__len=0;
	this.m__toke="";
	this.m__tokeType=0;
}
c_Parser.prototype.p_Bump=function(){
	while(this.m__pos<this.m__len){
		var t_ch=this.m__text.charCodeAt(this.m__pos);
		if(t_ch<=32){
			this.m__pos+=1;
			continue;
		}
		if(t_ch!=39){
			break;
		}
		this.m__pos+=1;
		while(this.m__pos<this.m__len && this.m__text.charCodeAt(this.m__pos)!=10){
			this.m__pos+=1;
		}
	}
	if(this.m__pos==this.m__len){
		this.m__toke="";
		this.m__tokeType=0;
		return this.m__toke;
	}
	var t_pos=this.m__pos;
	var t_ch2=this.m__text.charCodeAt(this.m__pos);
	this.m__pos+=1;
	if(bb_glslparser_IsAlpha(t_ch2) || t_ch2==95){
		while(this.m__pos<this.m__len){
			var t_ch3=this.m__text.charCodeAt(this.m__pos);
			if(!bb_glslparser_IsIdent(t_ch3)){
				break;
			}
			this.m__pos+=1;
		}
		this.m__tokeType=1;
	}else{
		if(bb_glslparser_IsDigit(t_ch2)){
			while(this.m__pos<this.m__len){
				if(!bb_glslparser_IsDigit(this.m__text.charCodeAt(this.m__pos))){
					break;
				}
				this.m__pos+=1;
			}
			this.m__tokeType=2;
		}else{
			if(t_ch2==34){
				while(this.m__pos<this.m__len){
					var t_ch4=this.m__text.charCodeAt(this.m__pos);
					if(t_ch4==34){
						break;
					}
					this.m__pos+=1;
				}
				if(this.m__pos==this.m__len){
					error("String literal missing closing quote");
				}
				this.m__tokeType=4;
				this.m__pos+=1;
			}else{
				var t_digraphs=[":="];
				if(this.m__pos<this.m__len){
					var t_ch5=this.m__text.charCodeAt(this.m__pos);
					var t_=t_digraphs;
					var t_2=0;
					while(t_2<t_.length){
						var t_t=t_[t_2];
						t_2=t_2+1;
						if(t_ch5==t_t.charCodeAt(1)){
							this.m__pos+=1;
							break;
						}
					}
				}
				this.m__tokeType=5;
			}
		}
	}
	this.m__toke=this.m__text.slice(t_pos,this.m__pos);
	return this.m__toke;
}
c_Parser.prototype.p_SetText=function(t_text){
	this.m__text=t_text;
	this.m__pos=0;
	this.m__len=this.m__text.length;
	this.p_Bump();
}
c_Parser.m_new=function(t_text){
	this.p_SetText(t_text);
	return this;
}
c_Parser.m_new2=function(){
	return this;
}
c_Parser.prototype.p_Toke=function(){
	return this.m__toke;
}
c_Parser.prototype.p_CParse=function(t_toke){
	if(this.m__toke!=t_toke){
		return false;
	}
	this.p_Bump();
	return true;
}
c_Parser.prototype.p_CParseIdent=function(){
	if(this.m__tokeType!=1){
		return "";
	}
	var t_id=this.m__toke;
	this.p_Bump();
	return t_id;
}
c_Parser.prototype.p_ParseIdent=function(){
	var t_id=this.p_CParseIdent();
	if(!((t_id).length!=0)){
		error("Expecting identifier");
	}
	return t_id;
}
c_Parser.prototype.p_Parse=function(){
	var t_toke=this.m__toke;
	this.p_Bump();
	return t_toke;
}
c_Parser.prototype.p_Parse2=function(t_toke){
	if(!this.p_CParse(t_toke)){
		error("Expecting '"+t_toke+"'");
	}
}
function c_GlslParser(){
	c_Parser.call(this);
}
c_GlslParser.prototype=extend_class(c_Parser);
c_GlslParser.m_new=function(t_text){
	c_Parser.m_new.call(this,t_text);
	return this;
}
c_GlslParser.m_new2=function(){
	c_Parser.m_new2.call(this);
	return this;
}
c_GlslParser.prototype.p_ParseType=function(){
	var t_id=this.p_ParseIdent();
	return t_id;
}
function bb_glslparser_IsAlpha(t_ch){
	return t_ch>=65 && t_ch<91 || t_ch>=97 && t_ch<123;
}
function bb_glslparser_IsIdent(t_ch){
	return t_ch>=65 && t_ch<91 || t_ch>=97 && t_ch<123 || t_ch>=48 && t_ch<58 || t_ch==95;
}
function bb_glslparser_IsDigit(t_ch){
	return t_ch>=48 && t_ch<58;
}
function c_KeyEnumerator(){
	Object.call(this);
	this.m_node=null;
}
c_KeyEnumerator.m_new=function(t_node){
	this.m_node=t_node;
	return this;
}
c_KeyEnumerator.m_new2=function(){
	return this;
}
c_KeyEnumerator.prototype.p_HasNext=function(){
	return this.m_node!=null;
}
c_KeyEnumerator.prototype.p_NextObject=function(){
	var t_t=this.m_node;
	this.m_node=this.m_node.p_NextNode();
	return t_t.m_key;
}
function c_MapKeys(){
	Object.call(this);
	this.m_map=null;
}
c_MapKeys.m_new=function(t_map){
	this.m_map=t_map;
	return this;
}
c_MapKeys.m_new2=function(){
	return this;
}
c_MapKeys.prototype.p_ObjectEnumerator=function(){
	return c_KeyEnumerator.m_new.call(new c_KeyEnumerator,this.m_map.p_FirstNode());
}
var bb_graphics2_fastShader=null;
function c_BumpShader(){
	c_Shader.call(this);
}
c_BumpShader.prototype=extend_class(c_Shader);
c_BumpShader.m_new=function(t_source){
	c_Shader.m_new.call(this,t_source);
	return this;
}
c_BumpShader.m_new2=function(){
	c_Shader.m_new2.call(this);
	return this;
}
c_BumpShader.prototype.p_OnInitMaterial=function(t_material){
	t_material.p_SetTexture("ColorTexture",c_Texture.m_White());
	t_material.p_SetTexture("SpecularTexture",c_Texture.m_Black());
	t_material.p_SetTexture("NormalTexture",c_Texture.m_Flat());
	t_material.p_SetVector("AmbientColor",[1.0,1.0,1.0,1.0]);
	t_material.p_SetScalar("Roughness",1.0);
}
c_BumpShader.prototype.p_OnLoadMaterial=function(t_material,t_path,t_texFlags){
	var t_format=4;
	var t_ext=bb_filepath_ExtractExt(t_path);
	if((t_ext).length!=0){
		t_path=bb_filepath_StripExt(t_path);
	}else{
		t_ext="png";
	}
	var t_colorTex=c_Texture.m_Load(t_path+"."+t_ext,t_format,t_texFlags);
	if(!((t_colorTex)!=null)){
		t_colorTex=c_Texture.m_Load(t_path+"_d."+t_ext,t_format,t_texFlags);
	}
	if(!((t_colorTex)!=null)){
		t_colorTex=c_Texture.m_Load(t_path+"_diff."+t_ext,t_format,t_texFlags);
	}
	if(!((t_colorTex)!=null)){
		t_colorTex=c_Texture.m_Load(t_path+"_diffuse."+t_ext,t_format,t_texFlags);
	}
	var t_specularTex=c_Texture.m_Load(t_path+"_s."+t_ext,t_format,t_texFlags);
	if(!((t_specularTex)!=null)){
		t_specularTex=c_Texture.m_Load(t_path+"_spec."+t_ext,t_format,t_texFlags);
	}
	if(!((t_specularTex)!=null)){
		t_specularTex=c_Texture.m_Load(t_path+"_specular."+t_ext,t_format,t_texFlags);
	}
	if(!((t_specularTex)!=null)){
		t_specularTex=c_Texture.m_Load(t_path+"_SPECULAR."+t_ext,t_format,t_texFlags);
	}
	var t_normalTex=c_Texture.m_Load(t_path+"_n."+t_ext,t_format,t_texFlags);
	if(!((t_normalTex)!=null)){
		t_normalTex=c_Texture.m_Load(t_path+"_norm."+t_ext,t_format,t_texFlags);
	}
	if(!((t_normalTex)!=null)){
		t_normalTex=c_Texture.m_Load(t_path+"_normal."+t_ext,t_format,t_texFlags);
	}
	if(!((t_normalTex)!=null)){
		t_normalTex=c_Texture.m_Load(t_path+"_NORMALS."+t_ext,t_format,t_texFlags);
	}
	if(!((t_colorTex)!=null) && !((t_specularTex)!=null) && !((t_normalTex)!=null)){
		return null;
	}
	t_material.p_SetTexture("ColorTexture",t_colorTex);
	t_material.p_SetTexture("SpecularTexture",t_specularTex);
	t_material.p_SetTexture("NormalTexture",t_normalTex);
	if(((t_specularTex)!=null) || ((t_normalTex)!=null)){
		t_material.p_SetVector("AmbientColor",[0.0,0.0,0.0,1.0]);
		t_material.p_SetScalar("Roughness",.5);
	}
	if((t_colorTex)!=null){
		t_colorTex.p_Release();
	}
	if((t_specularTex)!=null){
		t_specularTex.p_Release();
	}
	if((t_normalTex)!=null){
		t_normalTex.p_Release();
	}
	return t_material;
}
var bb_graphics2_bumpShader=null;
function c_MatteShader(){
	c_Shader.call(this);
}
c_MatteShader.prototype=extend_class(c_Shader);
c_MatteShader.m_new=function(t_source){
	c_Shader.m_new.call(this,t_source);
	return this;
}
c_MatteShader.m_new2=function(){
	c_Shader.m_new2.call(this);
	return this;
}
c_MatteShader.prototype.p_OnInitMaterial=function(t_material){
	t_material.p_SetTexture("ColorTexture",c_Texture.m_White());
	t_material.p_SetVector("AmbientColor",[0.0,0.0,0.0,1.0]);
	t_material.p_SetScalar("Roughness",1.0);
}
var bb_graphics2_matteShader=null;
var bb_graphics2_shadowShader=null;
var bb_graphics2_lightMapShader=null;
var bb_graphics2_defaultShader=null;
function c_Font(){
	Object.call(this);
	this.m__glyphs=[];
	this.m__firstChar=0;
	this.m__height=.0;
}
c_Font.m_new=function(t_glyphs,t_firstChar,t_height){
	this.m__glyphs=t_glyphs;
	this.m__firstChar=t_firstChar;
	this.m__height=t_height;
	return this;
}
c_Font.m_new2=function(){
	return this;
}
c_Font.m_Load=function(t_path,t_firstChar,t_numChars,t_padded){
	var t_image=c_Image2.m_Load(t_path,.5,.5,3,null);
	if(!((t_image)!=null)){
		return null;
	}
	var t_cellWidth=((t_image.p_Width()/t_numChars)|0);
	var t_cellHeight=t_image.p_Height();
	var t_glyphX=0;
	var t_glyphY=0;
	var t_glyphWidth=t_cellWidth;
	var t_glyphHeight=t_cellHeight;
	if(t_padded){
		t_glyphX+=1;
		t_glyphY+=1;
		t_glyphWidth-=2;
		t_glyphHeight-=2;
	}
	var t_w=((t_image.p_Width()/t_cellWidth)|0);
	var t_h=((t_image.p_Height()/t_cellHeight)|0);
	var t_glyphs=new_object_array(t_numChars);
	for(var t_i=0;t_i<t_numChars;t_i=t_i+1){
		var t_y=((t_i/t_w)|0);
		var t_x=t_i % t_w;
		var t_glyph=c_Glyph.m_new.call(new c_Glyph,t_image,t_firstChar+t_i,t_x*t_cellWidth+t_glyphX,t_y*t_cellHeight+t_glyphY,t_glyphWidth,t_glyphHeight,(t_glyphWidth));
		t_glyphs[t_i]=t_glyph;
	}
	return c_Font.m_new.call(new c_Font,t_glyphs,t_firstChar,(t_glyphHeight));
}
c_Font.m_Load2=function(t_path,t_cellWidth,t_cellHeight,t_glyphX,t_glyphY,t_glyphWidth,t_glyphHeight,t_firstChar,t_numChars){
	var t_image=c_Image2.m_Load(t_path,.5,.5,3,null);
	if(!((t_image)!=null)){
		return null;
	}
	var t_w=((t_image.p_Width()/t_cellWidth)|0);
	var t_h=((t_image.p_Height()/t_cellHeight)|0);
	var t_glyphs=new_object_array(t_numChars);
	for(var t_i=0;t_i<t_numChars;t_i=t_i+1){
		var t_y=((t_i/t_w)|0);
		var t_x=t_i % t_w;
		var t_glyph=c_Glyph.m_new.call(new c_Glyph,t_image,t_firstChar+t_i,t_x*t_cellWidth+t_glyphX,t_y*t_cellHeight+t_glyphY,t_glyphWidth,t_glyphHeight,(t_glyphWidth));
		t_glyphs[t_i]=t_glyph;
	}
	return c_Font.m_new.call(new c_Font,t_glyphs,t_firstChar,(t_glyphHeight));
}
function c_RefCounted(){
	Object.call(this);
	this.m__refs=1;
}
c_RefCounted.m_new=function(){
	return this;
}
c_RefCounted.prototype.p_Retain=function(){
	if(this.m__refs<=0){
		error("Internal error");
	}
	this.m__refs+=1;
}
c_RefCounted.prototype.p_Destroy=function(){
}
c_RefCounted.prototype.p_Release=function(){
	if(this.m__refs<=0){
		error("Internal error");
	}
	this.m__refs-=1;
	if((this.m__refs)!=0){
		return;
	}
	this.m__refs=-1;
	this.p_Destroy();
}
function c_Texture(){
	c_RefCounted.call(this);
	this.m__flags=0;
	this.m__width=0;
	this.m__height=0;
	this.m__format=0;
	this.m__seq=0;
	this.m__glTexture=0;
	this.m__glFramebuffer=0;
	this.m__data=null;
}
c_Texture.prototype=extend_class(c_RefCounted);
c_Texture.m__white=null;
c_Texture.m__colors=null;
c_Texture.prototype.p_Init3=function(){
	this.m__seq=webglGraphicsSeq;
	this.m__glTexture=gl.createTexture();
	bb_glutil_glPushTexture2d(this.m__glTexture);
	if((this.m__flags&1)!=0){
		gl.texParameteri(3553,10240,9729);
	}else{
		gl.texParameteri(3553,10240,9728);
	}
	if(((this.m__flags&2)!=0) && ((this.m__flags&1)!=0)){
		gl.texParameteri(3553,10241,9987);
	}else{
		if((this.m__flags&2)!=0){
			gl.texParameteri(3553,10241,9984);
		}else{
			if((this.m__flags&1)!=0){
				gl.texParameteri(3553,10241,9729);
			}else{
				gl.texParameteri(3553,10241,9728);
			}
		}
	}
	if((this.m__flags&4)!=0){
		gl.texParameteri(3553,10242,33071);
	}
	if((this.m__flags&8)!=0){
		gl.texParameteri(3553,10243,33071);
	}
	_glTexImage2D(3553,0,6408,this.m__width,this.m__height,0,6408,5121,null);
	bb_glutil_glPopTexture2d();
	if((this.m__flags&16)!=0){
		this.m__glFramebuffer=gl.createFramebuffer();
		bb_glutil_glPushFramebuffer(this.m__glFramebuffer);
		_glBindFramebuffer(36160,this.m__glFramebuffer);
		gl.framebufferTexture2D(36160,36064,3553,this.m__glTexture,0);
		if(gl.checkFramebufferStatus(36160)!=36053){
			error("Incomplete framebuffer");
		}
		bb_glutil_glPopFramebuffer();
	}
}
c_Texture.prototype.p_Init4=function(t_width,t_height,t_format,t_flags){
	if(t_format!=4){
		error("Invalid texture format: "+String(t_format));
	}
	if(!bb_graphics2_IsPow2(t_width) || !bb_graphics2_IsPow2(t_height)){
		t_flags&=-3;
	}
	this.m__width=t_width;
	this.m__height=t_height;
	this.m__format=t_format;
	this.m__flags=t_flags;
	this.p_Init3();
}
c_Texture.m_new=function(t_width,t_height,t_format,t_flags){
	c_RefCounted.m_new.call(this);
	this.p_Init4(t_width,t_height,t_format,t_flags);
	if((this.m__flags&256)!=0){
		var t_data=c_DataBuffer.m_new.call(new c_DataBuffer,t_width*t_height*4);
		for(var t_i=0;t_i<t_width*t_height*4;t_i=t_i+4){
			t_data.PokeInt(t_i,-65281);
		}
		this.m__data=(t_data);
	}
	return this;
}
c_Texture.prototype.p_Validate=function(){
	if(this.m__seq==webglGraphicsSeq){
		return;
	}
	this.p_Init3();
	if((this.m__data)!=null){
		this.p_LoadData(this.m__data);
	}
}
c_Texture.prototype.p_GLTexture=function(){
	this.p_Validate();
	return this.m__glTexture;
}
c_Texture.prototype.p_UpdateMipmaps=function(){
	if(!((this.m__flags&2)!=0)){
		return;
	}
	if(this.m__seq!=webglGraphicsSeq){
		return;
	}
	bb_glutil_glPushTexture2d(this.p_GLTexture());
	_glGenerateMipmap(3553);
	bb_glutil_glPopTexture2d();
}
c_Texture.prototype.p_LoadData=function(t_data){
	bb_glutil_glPushTexture2d(this.p_GLTexture());
	if((object_downcast((t_data),c_DataBuffer))!=null){
		_glTexImage2D(3553,0,6408,this.m__width,this.m__height,0,6408,5121,object_downcast((t_data),c_DataBuffer));
	}else{
		_glTexImage2D2(3553,0,6408,6408,5121,t_data);
	}
	bb_glutil_glPopTexture2d();
	this.p_UpdateMipmaps();
}
c_Texture.m_new2=function(t_width,t_height,t_format,t_flags,t_data){
	c_RefCounted.m_new.call(this);
	this.p_Init4(t_width,t_height,t_format,t_flags);
	this.p_LoadData(t_data);
	if(true){
		this.m__data=t_data;
	}
	return this;
}
c_Texture.m_new3=function(){
	c_RefCounted.m_new.call(this);
	return this;
}
c_Texture.m_Color=function(t_color){
	var t_tex=c_Texture.m__colors.p_Get(t_color);
	if((t_tex)!=null){
		return t_tex;
	}
	var t_data=c_DataBuffer.m_new.call(new c_DataBuffer,4);
	t_data.PokeInt(0,t_color);
	t_tex=c_Texture.m_new2.call(new c_Texture,1,1,4,12,(t_data));
	c_Texture.m__colors.p_Set3(t_color,t_tex);
	return t_tex;
}
c_Texture.m_White=function(){
	if(!((c_Texture.m__white)!=null)){
		c_Texture.m__white=c_Texture.m_Color(-1);
	}
	return c_Texture.m__white;
}
c_Texture.m_Load=function(t_path,t_format,t_flags){
	var t_info=new_number_array(2);
	var t_data=bb_gles20_LoadStaticTexImage(bb_graphics2_KludgePath(t_path),t_info);
	if(!((t_data)!=null)){
		return null;
	}
	var t_tex=c_Texture.m_new2.call(new c_Texture,t_info[0],t_info[1],t_format,t_flags,t_data);
	return t_tex;
}
c_Texture.prototype.p_Loading=function(){
	return BBTextureLoading(this.m__glTexture);
}
c_Texture.prototype.p_GLFramebuffer=function(){
	this.p_Validate();
	return this.m__glFramebuffer;
}
c_Texture.prototype.p_Flags=function(){
	return this.m__flags;
}
c_Texture.prototype.p_Width=function(){
	return this.m__width;
}
c_Texture.prototype.p_Height=function(){
	return this.m__height;
}
c_Texture.m__black=null;
c_Texture.m_Black=function(){
	if(!((c_Texture.m__black)!=null)){
		c_Texture.m__black=c_Texture.m_Color(-16777216);
	}
	return c_Texture.m__black;
}
c_Texture.m__flat=null;
c_Texture.m_Flat=function(){
	if(!((c_Texture.m__flat)!=null)){
		c_Texture.m__flat=c_Texture.m_Color(-7829368);
	}
	return c_Texture.m__flat;
}
c_Texture.prototype.p_Destroy=function(){
	if(this.m__seq==webglGraphicsSeq){
		gl.deleteTexture(this.m__glTexture);
	}
	this.m__glTexture=0;
	this.m__glFramebuffer=0;
}
function c_Material(){
	c_RefCounted.call(this);
	this.m__shader=null;
	this.m__inited=false;
	this.m__textures=c_StringMap2.m_new.call(new c_StringMap2);
	this.m__colorTexture=null;
	this.m__scalars=c_StringMap3.m_new.call(new c_StringMap3);
	this.m__vectors=c_StringMap4.m_new.call(new c_StringMap4);
}
c_Material.prototype=extend_class(c_RefCounted);
c_Material.prototype.p_SetTexture=function(t_param,t_texture){
	if(!((t_texture)!=null)){
		return;
	}
	if(this.m__inited && !this.m__textures.p_Contains2(t_param)){
		return;
	}
	var t_old=this.m__textures.p_Get2(t_param);
	t_texture.p_Retain();
	this.m__textures.p_Set4(t_param,t_texture);
	if((t_old)!=null){
		t_old.p_Release();
	}
	if(t_param=="ColorTexture"){
		this.m__colorTexture=t_texture;
	}
}
c_Material.m_new=function(t_shader){
	c_RefCounted.m_new.call(this);
	if(!((t_shader)!=null)){
		t_shader=bb_graphics2_defaultShader;
	}
	this.m__shader=t_shader;
	this.m__shader.p_OnInitMaterial(this);
	this.m__inited=true;
	return this;
}
c_Material.prototype.p_Shader=function(){
	return this.m__shader;
}
c_Material.m_Load=function(t_path,t_texFlags,t_shader){
	var t_material=c_Material.m_new.call(new c_Material,t_shader);
	t_material=t_material.p_Shader().p_OnLoadMaterial(t_material,t_path,t_texFlags);
	return t_material;
}
c_Material.prototype.p_Width=function(){
	if((this.m__colorTexture)!=null){
		return this.m__colorTexture.m__width;
	}
	return 0;
}
c_Material.prototype.p_Height=function(){
	if((this.m__colorTexture)!=null){
		return this.m__colorTexture.m__height;
	}
	return 0;
}
c_Material.prototype.p_ColorTexture=function(){
	return this.m__colorTexture;
}
c_Material.prototype.p_GetScalar=function(t_param,t_defValue){
	if(!this.m__scalars.p_Contains2(t_param)){
		return t_defValue;
	}
	return this.m__scalars.p_Get2(t_param);
}
c_Material.prototype.p_GetVector=function(t_param,t_defValue){
	if(!this.m__vectors.p_Contains2(t_param)){
		return t_defValue;
	}
	return this.m__vectors.p_Get2(t_param);
}
c_Material.prototype.p_GetTexture=function(t_param,t_defValue){
	if(!this.m__textures.p_Contains2(t_param)){
		return t_defValue;
	}
	return this.m__textures.p_Get2(t_param);
}
c_Material.prototype.p_Bind=function(){
	this.m__shader.p_Bind();
	if(bb_graphics2_rs_material==this){
		return true;
	}
	bb_graphics2_rs_material=this;
	var t_texid=0;
	var t_=bb_graphics2_rs_program.m_matuniforms;
	var t_2=0;
	while(t_2<t_.length){
		var t_u=t_[t_2];
		t_2=t_2+1;
		var t_1=t_u.m_type;
		if(t_1==5126){
			gl.uniform1f(t_u.m_location,this.p_GetScalar(t_u.m_name,1.0));
		}else{
			if(t_1==35666){
				_glUniform4fv(t_u.m_location,1,this.p_GetVector(t_u.m_name,[1.0,1.0,1.0,1.0]));
			}else{
				if(t_1==35678){
					var t_tex=this.p_GetTexture(t_u.m_name,null);
					if(t_tex.p_Loading()){
						bb_graphics2_rs_material=null;
						break;
					}
					gl.activeTexture(33984+t_texid);
					_glBindTexture(3553,t_tex.p_GLTexture());
					gl.uniform1i(t_u.m_location,t_texid);
					t_texid+=1;
				}else{
					error("Unsupported uniform type:"+String(t_u.m_type));
				}
			}
		}
	}
	if((t_texid)!=0){
		gl.activeTexture(33984);
	}
	return bb_graphics2_rs_material==this;
}
c_Material.prototype.p_SetVector=function(t_param,t_vector){
	if(this.m__inited && !this.m__vectors.p_Contains2(t_param)){
		return;
	}
	this.m__vectors.p_Set6(t_param,t_vector);
}
c_Material.prototype.p_SetScalar=function(t_param,t_scalar){
	if(this.m__inited && !this.m__scalars.p_Contains2(t_param)){
		return;
	}
	this.m__scalars.p_Set5(t_param,t_scalar);
}
c_Material.prototype.p_Destroy=function(){
	var t_=this.m__textures.p_ObjectEnumerator();
	while(t_.p_HasNext()){
		var t_tex=t_.p_NextObject();
		t_tex.p_Value().p_Release();
	}
}
function c_Map3(){
	Object.call(this);
	this.m_root=null;
}
c_Map3.m_new=function(){
	return this;
}
c_Map3.prototype.p_Compare=function(t_lhs,t_rhs){
}
c_Map3.prototype.p_FindNode=function(t_key){
	var t_node=this.m_root;
	while((t_node)!=null){
		var t_cmp=this.p_Compare(t_key,t_node.m_key);
		if(t_cmp>0){
			t_node=t_node.m_right;
		}else{
			if(t_cmp<0){
				t_node=t_node.m_left;
			}else{
				return t_node;
			}
		}
	}
	return t_node;
}
c_Map3.prototype.p_Get=function(t_key){
	var t_node=this.p_FindNode(t_key);
	if((t_node)!=null){
		return t_node.m_value;
	}
	return null;
}
c_Map3.prototype.p_RotateLeft3=function(t_node){
	var t_child=t_node.m_right;
	t_node.m_right=t_child.m_left;
	if((t_child.m_left)!=null){
		t_child.m_left.m_parent=t_node;
	}
	t_child.m_parent=t_node.m_parent;
	if((t_node.m_parent)!=null){
		if(t_node==t_node.m_parent.m_left){
			t_node.m_parent.m_left=t_child;
		}else{
			t_node.m_parent.m_right=t_child;
		}
	}else{
		this.m_root=t_child;
	}
	t_child.m_left=t_node;
	t_node.m_parent=t_child;
	return 0;
}
c_Map3.prototype.p_RotateRight3=function(t_node){
	var t_child=t_node.m_left;
	t_node.m_left=t_child.m_right;
	if((t_child.m_right)!=null){
		t_child.m_right.m_parent=t_node;
	}
	t_child.m_parent=t_node.m_parent;
	if((t_node.m_parent)!=null){
		if(t_node==t_node.m_parent.m_right){
			t_node.m_parent.m_right=t_child;
		}else{
			t_node.m_parent.m_left=t_child;
		}
	}else{
		this.m_root=t_child;
	}
	t_child.m_right=t_node;
	t_node.m_parent=t_child;
	return 0;
}
c_Map3.prototype.p_InsertFixup3=function(t_node){
	while(((t_node.m_parent)!=null) && t_node.m_parent.m_color==-1 && ((t_node.m_parent.m_parent)!=null)){
		if(t_node.m_parent==t_node.m_parent.m_parent.m_left){
			var t_uncle=t_node.m_parent.m_parent.m_right;
			if(((t_uncle)!=null) && t_uncle.m_color==-1){
				t_node.m_parent.m_color=1;
				t_uncle.m_color=1;
				t_uncle.m_parent.m_color=-1;
				t_node=t_uncle.m_parent;
			}else{
				if(t_node==t_node.m_parent.m_right){
					t_node=t_node.m_parent;
					this.p_RotateLeft3(t_node);
				}
				t_node.m_parent.m_color=1;
				t_node.m_parent.m_parent.m_color=-1;
				this.p_RotateRight3(t_node.m_parent.m_parent);
			}
		}else{
			var t_uncle2=t_node.m_parent.m_parent.m_left;
			if(((t_uncle2)!=null) && t_uncle2.m_color==-1){
				t_node.m_parent.m_color=1;
				t_uncle2.m_color=1;
				t_uncle2.m_parent.m_color=-1;
				t_node=t_uncle2.m_parent;
			}else{
				if(t_node==t_node.m_parent.m_left){
					t_node=t_node.m_parent;
					this.p_RotateRight3(t_node);
				}
				t_node.m_parent.m_color=1;
				t_node.m_parent.m_parent.m_color=-1;
				this.p_RotateLeft3(t_node.m_parent.m_parent);
			}
		}
	}
	this.m_root.m_color=1;
	return 0;
}
c_Map3.prototype.p_Set3=function(t_key,t_value){
	var t_node=this.m_root;
	var t_parent=null;
	var t_cmp=0;
	while((t_node)!=null){
		t_parent=t_node;
		t_cmp=this.p_Compare(t_key,t_node.m_key);
		if(t_cmp>0){
			t_node=t_node.m_right;
		}else{
			if(t_cmp<0){
				t_node=t_node.m_left;
			}else{
				t_node.m_value=t_value;
				return false;
			}
		}
	}
	t_node=c_Node3.m_new.call(new c_Node3,t_key,t_value,-1,t_parent);
	if((t_parent)!=null){
		if(t_cmp>0){
			t_parent.m_right=t_node;
		}else{
			t_parent.m_left=t_node;
		}
		this.p_InsertFixup3(t_node);
	}else{
		this.m_root=t_node;
	}
	return true;
}
function c_IntMap2(){
	c_Map3.call(this);
}
c_IntMap2.prototype=extend_class(c_Map3);
c_IntMap2.m_new=function(){
	c_Map3.m_new.call(this);
	return this;
}
c_IntMap2.prototype.p_Compare=function(t_lhs,t_rhs){
	return t_lhs-t_rhs;
}
function c_Node3(){
	Object.call(this);
	this.m_key=0;
	this.m_right=null;
	this.m_left=null;
	this.m_value=null;
	this.m_color=0;
	this.m_parent=null;
}
c_Node3.m_new=function(t_key,t_value,t_color,t_parent){
	this.m_key=t_key;
	this.m_value=t_value;
	this.m_color=t_color;
	this.m_parent=t_parent;
	return this;
}
c_Node3.m_new2=function(){
	return this;
}
function bb_graphics2_IsPow2(t_sz){
	return (t_sz&t_sz-1)==0;
}
function bb_glutil_glPushTexture2d(t_tex){
	_glGetIntegerv(32873,bb_glutil_tmpi);
	_glBindTexture(3553,t_tex);
}
function bb_glutil_glPopTexture2d(){
	_glBindTexture(3553,bb_glutil_tmpi[0]);
}
function bb_glutil_glPushFramebuffer(t_framebuf){
	_glGetIntegerv(36006,bb_glutil_tmpi);
	_glBindFramebuffer(36160,t_framebuf);
}
function bb_glutil_glPopFramebuffer(){
	_glBindFramebuffer(36160,bb_glutil_tmpi[0]);
}
function c_Map4(){
	Object.call(this);
	this.m_root=null;
}
c_Map4.m_new=function(){
	return this;
}
c_Map4.prototype.p_Compare2=function(t_lhs,t_rhs){
}
c_Map4.prototype.p_FindNode2=function(t_key){
	var t_node=this.m_root;
	while((t_node)!=null){
		var t_cmp=this.p_Compare2(t_key,t_node.m_key);
		if(t_cmp>0){
			t_node=t_node.m_right;
		}else{
			if(t_cmp<0){
				t_node=t_node.m_left;
			}else{
				return t_node;
			}
		}
	}
	return t_node;
}
c_Map4.prototype.p_Contains2=function(t_key){
	return this.p_FindNode2(t_key)!=null;
}
c_Map4.prototype.p_Get2=function(t_key){
	var t_node=this.p_FindNode2(t_key);
	if((t_node)!=null){
		return t_node.m_value;
	}
	return null;
}
c_Map4.prototype.p_RotateLeft4=function(t_node){
	var t_child=t_node.m_right;
	t_node.m_right=t_child.m_left;
	if((t_child.m_left)!=null){
		t_child.m_left.m_parent=t_node;
	}
	t_child.m_parent=t_node.m_parent;
	if((t_node.m_parent)!=null){
		if(t_node==t_node.m_parent.m_left){
			t_node.m_parent.m_left=t_child;
		}else{
			t_node.m_parent.m_right=t_child;
		}
	}else{
		this.m_root=t_child;
	}
	t_child.m_left=t_node;
	t_node.m_parent=t_child;
	return 0;
}
c_Map4.prototype.p_RotateRight4=function(t_node){
	var t_child=t_node.m_left;
	t_node.m_left=t_child.m_right;
	if((t_child.m_right)!=null){
		t_child.m_right.m_parent=t_node;
	}
	t_child.m_parent=t_node.m_parent;
	if((t_node.m_parent)!=null){
		if(t_node==t_node.m_parent.m_right){
			t_node.m_parent.m_right=t_child;
		}else{
			t_node.m_parent.m_left=t_child;
		}
	}else{
		this.m_root=t_child;
	}
	t_child.m_right=t_node;
	t_node.m_parent=t_child;
	return 0;
}
c_Map4.prototype.p_InsertFixup4=function(t_node){
	while(((t_node.m_parent)!=null) && t_node.m_parent.m_color==-1 && ((t_node.m_parent.m_parent)!=null)){
		if(t_node.m_parent==t_node.m_parent.m_parent.m_left){
			var t_uncle=t_node.m_parent.m_parent.m_right;
			if(((t_uncle)!=null) && t_uncle.m_color==-1){
				t_node.m_parent.m_color=1;
				t_uncle.m_color=1;
				t_uncle.m_parent.m_color=-1;
				t_node=t_uncle.m_parent;
			}else{
				if(t_node==t_node.m_parent.m_right){
					t_node=t_node.m_parent;
					this.p_RotateLeft4(t_node);
				}
				t_node.m_parent.m_color=1;
				t_node.m_parent.m_parent.m_color=-1;
				this.p_RotateRight4(t_node.m_parent.m_parent);
			}
		}else{
			var t_uncle2=t_node.m_parent.m_parent.m_left;
			if(((t_uncle2)!=null) && t_uncle2.m_color==-1){
				t_node.m_parent.m_color=1;
				t_uncle2.m_color=1;
				t_uncle2.m_parent.m_color=-1;
				t_node=t_uncle2.m_parent;
			}else{
				if(t_node==t_node.m_parent.m_left){
					t_node=t_node.m_parent;
					this.p_RotateRight4(t_node);
				}
				t_node.m_parent.m_color=1;
				t_node.m_parent.m_parent.m_color=-1;
				this.p_RotateLeft4(t_node.m_parent.m_parent);
			}
		}
	}
	this.m_root.m_color=1;
	return 0;
}
c_Map4.prototype.p_Set4=function(t_key,t_value){
	var t_node=this.m_root;
	var t_parent=null;
	var t_cmp=0;
	while((t_node)!=null){
		t_parent=t_node;
		t_cmp=this.p_Compare2(t_key,t_node.m_key);
		if(t_cmp>0){
			t_node=t_node.m_right;
		}else{
			if(t_cmp<0){
				t_node=t_node.m_left;
			}else{
				t_node.m_value=t_value;
				return false;
			}
		}
	}
	t_node=c_Node4.m_new.call(new c_Node4,t_key,t_value,-1,t_parent);
	if((t_parent)!=null){
		if(t_cmp>0){
			t_parent.m_right=t_node;
		}else{
			t_parent.m_left=t_node;
		}
		this.p_InsertFixup4(t_node);
	}else{
		this.m_root=t_node;
	}
	return true;
}
c_Map4.prototype.p_FirstNode=function(){
	if(!((this.m_root)!=null)){
		return null;
	}
	var t_node=this.m_root;
	while((t_node.m_left)!=null){
		t_node=t_node.m_left;
	}
	return t_node;
}
c_Map4.prototype.p_ObjectEnumerator=function(){
	return c_NodeEnumerator.m_new.call(new c_NodeEnumerator,this.p_FirstNode());
}
function c_StringMap2(){
	c_Map4.call(this);
}
c_StringMap2.prototype=extend_class(c_Map4);
c_StringMap2.m_new=function(){
	c_Map4.m_new.call(this);
	return this;
}
c_StringMap2.prototype.p_Compare2=function(t_lhs,t_rhs){
	return string_compare(t_lhs,t_rhs);
}
function c_Node4(){
	Object.call(this);
	this.m_key="";
	this.m_right=null;
	this.m_left=null;
	this.m_value=null;
	this.m_color=0;
	this.m_parent=null;
}
c_Node4.m_new=function(t_key,t_value,t_color,t_parent){
	this.m_key=t_key;
	this.m_value=t_value;
	this.m_color=t_color;
	this.m_parent=t_parent;
	return this;
}
c_Node4.m_new2=function(){
	return this;
}
c_Node4.prototype.p_NextNode=function(){
	var t_node=null;
	if((this.m_right)!=null){
		t_node=this.m_right;
		while((t_node.m_left)!=null){
			t_node=t_node.m_left;
		}
		return t_node;
	}
	t_node=this;
	var t_parent=this.m_parent;
	while(((t_parent)!=null) && t_node==t_parent.m_right){
		t_node=t_parent;
		t_parent=t_parent.m_parent;
	}
	return t_parent;
}
c_Node4.prototype.p_Value=function(){
	return this.m_value;
}
function bb_graphics2_KludgePath(t_path){
	if(string_startswith(t_path,".") || string_startswith(t_path,"/")){
		return t_path;
	}
	var t_i=t_path.indexOf(":/",0);
	if(t_i!=-1 && t_path.indexOf("/",0)==t_i+1){
		return t_path;
	}
	return "monkey://data/"+t_path;
}
function bb_gles20_LoadStaticTexImage(t_path,t_info){
	return BBLoadStaticTexImage(t_path,t_info);
}
function c_Glyph(){
	Object.call(this);
	this.m_image=null;
	this.m_char=0;
	this.m_x=0;
	this.m_y=0;
	this.m_width=0;
	this.m_height=0;
	this.m_advance=.0;
}
c_Glyph.m_new=function(t_image,t_char,t_x,t_y,t_width,t_height,t_advance){
	this.m_image=t_image;
	this.m_char=t_char;
	this.m_x=t_x;
	this.m_y=t_y;
	this.m_width=t_width;
	this.m_height=t_height;
	this.m_advance=t_advance;
	return this;
}
c_Glyph.m_new2=function(){
	return this;
}
var bb_graphics2_defaultFont=null;
function bb_math3d_Mat4New(){
	return [1.0,0.0,0.0,0.0,0.0,1.0,0.0,0.0,0.0,0.0,1.0,0.0,0.0,0.0,0.0,1.0];
}
var bb_graphics2_flipYMatrix=[];
function bb_graphics2_Init(){
	if(bb_graphics2_inited){
		return;
	}
	bb_graphics2_inited=true;
	bb_graphics2_InitVbos();
	_glGetIntegerv(36006,bb_graphics2_tmpi);
	bb_graphics2_defaultFbo=bb_graphics2_tmpi[0];
	bb_graphics2_mainShader=bb_app_LoadString("monkey://data/mojo2_program.glsl");
	bb_graphics2_fastShader=c_Shader.m_new.call(new c_Shader,bb_app_LoadString("monkey://data/mojo2_fastshader.glsl"));
	bb_graphics2_bumpShader=(c_BumpShader.m_new.call(new c_BumpShader,bb_app_LoadString("monkey://data/mojo2_bumpshader.glsl")));
	bb_graphics2_matteShader=(c_MatteShader.m_new.call(new c_MatteShader,bb_app_LoadString("monkey://data/mojo2_matteshader.glsl")));
	bb_graphics2_shadowShader=c_Shader.m_new.call(new c_Shader,bb_app_LoadString("monkey://data/mojo2_shadowshader.glsl"));
	bb_graphics2_lightMapShader=c_Shader.m_new.call(new c_Shader,bb_app_LoadString("monkey://data/mojo2_lightmapshader.glsl"));
	bb_graphics2_defaultShader=bb_graphics2_bumpShader;
	bb_graphics2_defaultFont=c_Font.m_Load("monkey://data/mojo2_font.png",32,96,true);
	if(!((bb_graphics2_defaultFont)!=null)){
		error("Can't load default font");
	}
	bb_graphics2_flipYMatrix[5]=-1.0;
}
function c_LightData(){
	Object.call(this);
	this.m_type=0;
	this.m_vector=[0.0,0.0,-10.0,1.0];
	this.m_tvector=new_number_array(4);
	this.m_color=[1.0,1.0,1.0,1.0];
	this.m_range=10.0;
}
c_LightData.m_new=function(){
	return this;
}
function c_DrawOp(){
	Object.call(this);
	this.m_material=null;
	this.m_blend=0;
	this.m_order=0;
	this.m_count=0;
}
c_DrawOp.m_new=function(){
	return this;
}
var bb_graphics2_rs_program=null;
var bb_graphics2_rs_numLights=0;
var bb_graphics2_rs_material=null;
var bb_graphics2_rs_modelViewProjMatrix=[];
var bb_graphics2_rs_modelViewMatrix=[];
var bb_graphics2_rs_clipPosScale=[];
var bb_graphics2_rs_globalColor=[];
var bb_graphics2_rs_fogColor=[];
var bb_graphics2_rs_ambientLight=[];
var bb_graphics2_rs_lightColors=[];
var bb_graphics2_rs_lightVectors=[];
var bb_graphics2_rs_shadowTexture=null;
function c_Map5(){
	Object.call(this);
	this.m_root=null;
}
c_Map5.m_new=function(){
	return this;
}
c_Map5.prototype.p_Compare2=function(t_lhs,t_rhs){
}
c_Map5.prototype.p_FindNode2=function(t_key){
	var t_node=this.m_root;
	while((t_node)!=null){
		var t_cmp=this.p_Compare2(t_key,t_node.m_key);
		if(t_cmp>0){
			t_node=t_node.m_right;
		}else{
			if(t_cmp<0){
				t_node=t_node.m_left;
			}else{
				return t_node;
			}
		}
	}
	return t_node;
}
c_Map5.prototype.p_Contains2=function(t_key){
	return this.p_FindNode2(t_key)!=null;
}
c_Map5.prototype.p_Get2=function(t_key){
	var t_node=this.p_FindNode2(t_key);
	if((t_node)!=null){
		return t_node.m_value;
	}
	return 0;
}
c_Map5.prototype.p_RotateLeft5=function(t_node){
	var t_child=t_node.m_right;
	t_node.m_right=t_child.m_left;
	if((t_child.m_left)!=null){
		t_child.m_left.m_parent=t_node;
	}
	t_child.m_parent=t_node.m_parent;
	if((t_node.m_parent)!=null){
		if(t_node==t_node.m_parent.m_left){
			t_node.m_parent.m_left=t_child;
		}else{
			t_node.m_parent.m_right=t_child;
		}
	}else{
		this.m_root=t_child;
	}
	t_child.m_left=t_node;
	t_node.m_parent=t_child;
	return 0;
}
c_Map5.prototype.p_RotateRight5=function(t_node){
	var t_child=t_node.m_left;
	t_node.m_left=t_child.m_right;
	if((t_child.m_right)!=null){
		t_child.m_right.m_parent=t_node;
	}
	t_child.m_parent=t_node.m_parent;
	if((t_node.m_parent)!=null){
		if(t_node==t_node.m_parent.m_right){
			t_node.m_parent.m_right=t_child;
		}else{
			t_node.m_parent.m_left=t_child;
		}
	}else{
		this.m_root=t_child;
	}
	t_child.m_right=t_node;
	t_node.m_parent=t_child;
	return 0;
}
c_Map5.prototype.p_InsertFixup5=function(t_node){
	while(((t_node.m_parent)!=null) && t_node.m_parent.m_color==-1 && ((t_node.m_parent.m_parent)!=null)){
		if(t_node.m_parent==t_node.m_parent.m_parent.m_left){
			var t_uncle=t_node.m_parent.m_parent.m_right;
			if(((t_uncle)!=null) && t_uncle.m_color==-1){
				t_node.m_parent.m_color=1;
				t_uncle.m_color=1;
				t_uncle.m_parent.m_color=-1;
				t_node=t_uncle.m_parent;
			}else{
				if(t_node==t_node.m_parent.m_right){
					t_node=t_node.m_parent;
					this.p_RotateLeft5(t_node);
				}
				t_node.m_parent.m_color=1;
				t_node.m_parent.m_parent.m_color=-1;
				this.p_RotateRight5(t_node.m_parent.m_parent);
			}
		}else{
			var t_uncle2=t_node.m_parent.m_parent.m_left;
			if(((t_uncle2)!=null) && t_uncle2.m_color==-1){
				t_node.m_parent.m_color=1;
				t_uncle2.m_color=1;
				t_uncle2.m_parent.m_color=-1;
				t_node=t_uncle2.m_parent;
			}else{
				if(t_node==t_node.m_parent.m_left){
					t_node=t_node.m_parent;
					this.p_RotateRight5(t_node);
				}
				t_node.m_parent.m_color=1;
				t_node.m_parent.m_parent.m_color=-1;
				this.p_RotateLeft5(t_node.m_parent.m_parent);
			}
		}
	}
	this.m_root.m_color=1;
	return 0;
}
c_Map5.prototype.p_Set5=function(t_key,t_value){
	var t_node=this.m_root;
	var t_parent=null;
	var t_cmp=0;
	while((t_node)!=null){
		t_parent=t_node;
		t_cmp=this.p_Compare2(t_key,t_node.m_key);
		if(t_cmp>0){
			t_node=t_node.m_right;
		}else{
			if(t_cmp<0){
				t_node=t_node.m_left;
			}else{
				t_node.m_value=t_value;
				return false;
			}
		}
	}
	t_node=c_Node5.m_new.call(new c_Node5,t_key,t_value,-1,t_parent);
	if((t_parent)!=null){
		if(t_cmp>0){
			t_parent.m_right=t_node;
		}else{
			t_parent.m_left=t_node;
		}
		this.p_InsertFixup5(t_node);
	}else{
		this.m_root=t_node;
	}
	return true;
}
function c_StringMap3(){
	c_Map5.call(this);
}
c_StringMap3.prototype=extend_class(c_Map5);
c_StringMap3.m_new=function(){
	c_Map5.m_new.call(this);
	return this;
}
c_StringMap3.prototype.p_Compare2=function(t_lhs,t_rhs){
	return string_compare(t_lhs,t_rhs);
}
function c_Node5(){
	Object.call(this);
	this.m_key="";
	this.m_right=null;
	this.m_left=null;
	this.m_value=0;
	this.m_color=0;
	this.m_parent=null;
}
c_Node5.m_new=function(t_key,t_value,t_color,t_parent){
	this.m_key=t_key;
	this.m_value=t_value;
	this.m_color=t_color;
	this.m_parent=t_parent;
	return this;
}
c_Node5.m_new2=function(){
	return this;
}
function c_Map6(){
	Object.call(this);
	this.m_root=null;
}
c_Map6.m_new=function(){
	return this;
}
c_Map6.prototype.p_Compare2=function(t_lhs,t_rhs){
}
c_Map6.prototype.p_FindNode2=function(t_key){
	var t_node=this.m_root;
	while((t_node)!=null){
		var t_cmp=this.p_Compare2(t_key,t_node.m_key);
		if(t_cmp>0){
			t_node=t_node.m_right;
		}else{
			if(t_cmp<0){
				t_node=t_node.m_left;
			}else{
				return t_node;
			}
		}
	}
	return t_node;
}
c_Map6.prototype.p_Contains2=function(t_key){
	return this.p_FindNode2(t_key)!=null;
}
c_Map6.prototype.p_Get2=function(t_key){
	var t_node=this.p_FindNode2(t_key);
	if((t_node)!=null){
		return t_node.m_value;
	}
	return [];
}
c_Map6.prototype.p_RotateLeft6=function(t_node){
	var t_child=t_node.m_right;
	t_node.m_right=t_child.m_left;
	if((t_child.m_left)!=null){
		t_child.m_left.m_parent=t_node;
	}
	t_child.m_parent=t_node.m_parent;
	if((t_node.m_parent)!=null){
		if(t_node==t_node.m_parent.m_left){
			t_node.m_parent.m_left=t_child;
		}else{
			t_node.m_parent.m_right=t_child;
		}
	}else{
		this.m_root=t_child;
	}
	t_child.m_left=t_node;
	t_node.m_parent=t_child;
	return 0;
}
c_Map6.prototype.p_RotateRight6=function(t_node){
	var t_child=t_node.m_left;
	t_node.m_left=t_child.m_right;
	if((t_child.m_right)!=null){
		t_child.m_right.m_parent=t_node;
	}
	t_child.m_parent=t_node.m_parent;
	if((t_node.m_parent)!=null){
		if(t_node==t_node.m_parent.m_right){
			t_node.m_parent.m_right=t_child;
		}else{
			t_node.m_parent.m_left=t_child;
		}
	}else{
		this.m_root=t_child;
	}
	t_child.m_right=t_node;
	t_node.m_parent=t_child;
	return 0;
}
c_Map6.prototype.p_InsertFixup6=function(t_node){
	while(((t_node.m_parent)!=null) && t_node.m_parent.m_color==-1 && ((t_node.m_parent.m_parent)!=null)){
		if(t_node.m_parent==t_node.m_parent.m_parent.m_left){
			var t_uncle=t_node.m_parent.m_parent.m_right;
			if(((t_uncle)!=null) && t_uncle.m_color==-1){
				t_node.m_parent.m_color=1;
				t_uncle.m_color=1;
				t_uncle.m_parent.m_color=-1;
				t_node=t_uncle.m_parent;
			}else{
				if(t_node==t_node.m_parent.m_right){
					t_node=t_node.m_parent;
					this.p_RotateLeft6(t_node);
				}
				t_node.m_parent.m_color=1;
				t_node.m_parent.m_parent.m_color=-1;
				this.p_RotateRight6(t_node.m_parent.m_parent);
			}
		}else{
			var t_uncle2=t_node.m_parent.m_parent.m_left;
			if(((t_uncle2)!=null) && t_uncle2.m_color==-1){
				t_node.m_parent.m_color=1;
				t_uncle2.m_color=1;
				t_uncle2.m_parent.m_color=-1;
				t_node=t_uncle2.m_parent;
			}else{
				if(t_node==t_node.m_parent.m_left){
					t_node=t_node.m_parent;
					this.p_RotateRight6(t_node);
				}
				t_node.m_parent.m_color=1;
				t_node.m_parent.m_parent.m_color=-1;
				this.p_RotateLeft6(t_node.m_parent.m_parent);
			}
		}
	}
	this.m_root.m_color=1;
	return 0;
}
c_Map6.prototype.p_Set6=function(t_key,t_value){
	var t_node=this.m_root;
	var t_parent=null;
	var t_cmp=0;
	while((t_node)!=null){
		t_parent=t_node;
		t_cmp=this.p_Compare2(t_key,t_node.m_key);
		if(t_cmp>0){
			t_node=t_node.m_right;
		}else{
			if(t_cmp<0){
				t_node=t_node.m_left;
			}else{
				t_node.m_value=t_value;
				return false;
			}
		}
	}
	t_node=c_Node6.m_new.call(new c_Node6,t_key,t_value,-1,t_parent);
	if((t_parent)!=null){
		if(t_cmp>0){
			t_parent.m_right=t_node;
		}else{
			t_parent.m_left=t_node;
		}
		this.p_InsertFixup6(t_node);
	}else{
		this.m_root=t_node;
	}
	return true;
}
function c_StringMap4(){
	c_Map6.call(this);
}
c_StringMap4.prototype=extend_class(c_Map6);
c_StringMap4.m_new=function(){
	c_Map6.m_new.call(this);
	return this;
}
c_StringMap4.prototype.p_Compare2=function(t_lhs,t_rhs){
	return string_compare(t_lhs,t_rhs);
}
function c_Node6(){
	Object.call(this);
	this.m_key="";
	this.m_right=null;
	this.m_left=null;
	this.m_value=[];
	this.m_color=0;
	this.m_parent=null;
}
c_Node6.m_new=function(t_key,t_value,t_color,t_parent){
	this.m_key=t_key;
	this.m_value=t_value;
	this.m_color=t_color;
	this.m_parent=t_parent;
	return this;
}
c_Node6.m_new2=function(){
	return this;
}
var bb_graphics2_rs_blend=0;
function c_BlendMode(){
	Object.call(this);
}
function c_Stack3(){
	Object.call(this);
	this.m_data=[];
	this.m_length=0;
}
c_Stack3.m_new=function(){
	return this;
}
c_Stack3.m_new2=function(t_data){
	this.m_data=t_data.slice(0);
	this.m_length=t_data.length;
	return this;
}
c_Stack3.prototype.p_Data=function(){
	return this.m_data;
}
c_Stack3.m_NIL=null;
c_Stack3.prototype.p_Length=function(t_newlength){
	if(t_newlength<this.m_length){
		for(var t_i=t_newlength;t_i<this.m_length;t_i=t_i+1){
			this.m_data[t_i]=c_Stack3.m_NIL;
		}
	}else{
		if(t_newlength>this.m_data.length){
			this.m_data=resize_object_array(this.m_data,bb_math_Max(this.m_length*2+10,t_newlength));
		}
	}
	this.m_length=t_newlength;
}
c_Stack3.prototype.p_Length2=function(){
	return this.m_length;
}
c_Stack3.prototype.p_Push7=function(t_value){
	if(this.m_length==this.m_data.length){
		this.m_data=resize_object_array(this.m_data,this.m_length*2+10);
	}
	this.m_data[this.m_length]=t_value;
	this.m_length+=1;
}
c_Stack3.prototype.p_Push8=function(t_values,t_offset,t_count){
	for(var t_i=0;t_i<t_count;t_i=t_i+1){
		this.p_Push7(t_values[t_offset+t_i]);
	}
}
c_Stack3.prototype.p_Push9=function(t_values,t_offset){
	this.p_Push8(t_values,t_offset,t_values.length-t_offset);
}
c_Stack3.prototype.p_Clear2=function(){
	for(var t_i=0;t_i<this.m_length;t_i=t_i+1){
		this.m_data[t_i]=c_Stack3.m_NIL;
	}
	this.m_length=0;
}
c_Stack3.prototype.p_Pop=function(){
	this.m_length-=1;
	var t_v=this.m_data[this.m_length];
	this.m_data[this.m_length]=c_Stack3.m_NIL;
	return t_v;
}
function bb_math_Max(t_x,t_y){
	if(t_x>t_y){
		return t_x;
	}
	return t_y;
}
function bb_math_Max2(t_x,t_y){
	if(t_x>t_y){
		return t_x;
	}
	return t_y;
}
var bb_graphics2_freeOps=null;
var bb_graphics2_nullOp=null;
function c_ShadowCaster(){
	Object.call(this);
	this.m__verts=[];
}
function c_Stack4(){
	Object.call(this);
	this.m_data=[];
	this.m_length=0;
}
c_Stack4.m_new=function(){
	return this;
}
c_Stack4.m_new2=function(t_data){
	this.m_data=t_data.slice(0);
	this.m_length=t_data.length;
	return this;
}
c_Stack4.m_NIL=null;
c_Stack4.prototype.p_Clear2=function(){
	for(var t_i=0;t_i<this.m_length;t_i=t_i+1){
		this.m_data[t_i]=c_Stack4.m_NIL;
	}
	this.m_length=0;
}
c_Stack4.prototype.p_Push10=function(t_value){
	if(this.m_length==this.m_data.length){
		this.m_data=resize_object_array(this.m_data,this.m_length*2+10);
	}
	this.m_data[this.m_length]=t_value;
	this.m_length+=1;
}
c_Stack4.prototype.p_Push11=function(t_values,t_offset,t_count){
	for(var t_i=0;t_i<t_count;t_i=t_i+1){
		this.p_Push10(t_values[t_offset+t_i]);
	}
}
c_Stack4.prototype.p_Push12=function(t_values,t_offset){
	this.p_Push11(t_values,t_offset,t_values.length-t_offset);
}
function c_Stack5(){
	Object.call(this);
	this.m_data=[];
	this.m_length=0;
}
c_Stack5.m_new=function(){
	return this;
}
c_Stack5.m_new2=function(t_data){
	this.m_data=t_data.slice(0);
	this.m_length=t_data.length;
	return this;
}
c_Stack5.m_NIL=0;
c_Stack5.prototype.p_Clear2=function(){
	for(var t_i=0;t_i<this.m_length;t_i=t_i+1){
		this.m_data[t_i]=c_Stack5.m_NIL;
	}
	this.m_length=0;
}
c_Stack5.prototype.p_Push13=function(t_value){
	if(this.m_length==this.m_data.length){
		this.m_data=resize_number_array(this.m_data,this.m_length*2+10);
	}
	this.m_data[this.m_length]=t_value;
	this.m_length+=1;
}
c_Stack5.prototype.p_Push14=function(t_values,t_offset,t_count){
	for(var t_i=0;t_i<t_count;t_i=t_i+1){
		this.p_Push13(t_values[t_offset+t_i]);
	}
}
c_Stack5.prototype.p_Push15=function(t_values,t_offset){
	this.p_Push14(t_values,t_offset,t_values.length-t_offset);
}
function c_FloatStack(){
	c_Stack5.call(this);
}
c_FloatStack.prototype=extend_class(c_Stack5);
c_FloatStack.m_new=function(t_data){
	c_Stack5.m_new2.call(this,t_data);
	return this;
}
c_FloatStack.m_new2=function(){
	c_Stack5.m_new.call(this);
	return this;
}
var bb_graphics2_rs_projMatrix=[];
function bb_math3d_Mat4Copy(t_m,t_r){
	t_r[0]=t_m[0];
	t_r[1]=t_m[1];
	t_r[2]=t_m[2];
	t_r[3]=t_m[3];
	t_r[4]=t_m[4];
	t_r[5]=t_m[5];
	t_r[6]=t_m[6];
	t_r[7]=t_m[7];
	t_r[8]=t_m[8];
	t_r[9]=t_m[9];
	t_r[10]=t_m[10];
	t_r[11]=t_m[11];
	t_r[12]=t_m[12];
	t_r[13]=t_m[13];
	t_r[14]=t_m[14];
	t_r[15]=t_m[15];
}
function bb_math3d_Mat4Init(t_ix,t_jy,t_kz,t_tw,t_r){
	t_r[0]=t_ix;
	t_r[1]=0.0;
	t_r[2]=0.0;
	t_r[3]=0.0;
	t_r[4]=0.0;
	t_r[5]=t_jy;
	t_r[6]=0.0;
	t_r[7]=0.0;
	t_r[8]=0.0;
	t_r[9]=0.0;
	t_r[10]=t_kz;
	t_r[11]=0.0;
	t_r[12]=0.0;
	t_r[13]=0.0;
	t_r[14]=0.0;
	t_r[15]=t_tw;
}
function bb_math3d_Mat4Init2(t_ix,t_iy,t_iz,t_iw,t_jx,t_jy,t_jz,t_jw,t_kx,t_ky,t_kz,t_kw,t_tx,t_ty,t_tz,t_tw,t_r){
	t_r[0]=t_ix;
	t_r[1]=t_iy;
	t_r[2]=t_iz;
	t_r[3]=t_iw;
	t_r[4]=t_jx;
	t_r[5]=t_jy;
	t_r[6]=t_jz;
	t_r[7]=t_jw;
	t_r[8]=t_kx;
	t_r[9]=t_ky;
	t_r[10]=t_kz;
	t_r[11]=t_kw;
	t_r[12]=t_tx;
	t_r[13]=t_ty;
	t_r[14]=t_tz;
	t_r[15]=t_tw;
}
function bb_math3d_Mat4Init3(t_r){
	bb_math3d_Mat4Init(1.0,1.0,1.0,1.0,t_r);
}
function bb_math3d_Mat4Multiply(t_m,t_n,t_r){
	bb_math3d_Mat4Init2(t_m[0]*t_n[0]+t_m[4]*t_n[1]+t_m[8]*t_n[2]+t_m[12]*t_n[3],t_m[1]*t_n[0]+t_m[5]*t_n[1]+t_m[9]*t_n[2]+t_m[13]*t_n[3],t_m[2]*t_n[0]+t_m[6]*t_n[1]+t_m[10]*t_n[2]+t_m[14]*t_n[3],t_m[3]*t_n[0]+t_m[7]*t_n[1]+t_m[11]*t_n[2]+t_m[15]*t_n[3],t_m[0]*t_n[4]+t_m[4]*t_n[5]+t_m[8]*t_n[6]+t_m[12]*t_n[7],t_m[1]*t_n[4]+t_m[5]*t_n[5]+t_m[9]*t_n[6]+t_m[13]*t_n[7],t_m[2]*t_n[4]+t_m[6]*t_n[5]+t_m[10]*t_n[6]+t_m[14]*t_n[7],t_m[3]*t_n[4]+t_m[7]*t_n[5]+t_m[11]*t_n[6]+t_m[15]*t_n[7],t_m[0]*t_n[8]+t_m[4]*t_n[9]+t_m[8]*t_n[10]+t_m[12]*t_n[11],t_m[1]*t_n[8]+t_m[5]*t_n[9]+t_m[9]*t_n[10]+t_m[13]*t_n[11],t_m[2]*t_n[8]+t_m[6]*t_n[9]+t_m[10]*t_n[10]+t_m[14]*t_n[11],t_m[3]*t_n[8]+t_m[7]*t_n[9]+t_m[11]*t_n[10]+t_m[15]*t_n[11],t_m[0]*t_n[12]+t_m[4]*t_n[13]+t_m[8]*t_n[14]+t_m[12]*t_n[15],t_m[1]*t_n[12]+t_m[5]*t_n[13]+t_m[9]*t_n[14]+t_m[13]*t_n[15],t_m[2]*t_n[12]+t_m[6]*t_n[13]+t_m[10]*t_n[14]+t_m[14]*t_n[15],t_m[3]*t_n[12]+t_m[7]*t_n[13]+t_m[11]*t_n[14]+t_m[15]*t_n[15],t_r);
}
function bb_math3d_Vec4Copy(t_v,t_r){
	t_r[0]=t_v[0];
	t_r[1]=t_v[1];
	t_r[2]=t_v[2];
	t_r[3]=t_v[3];
}
function bb_math3d_Vec4Copy2(t_v,t_r,t_src,t_dst){
	t_r[0+t_dst]=t_v[0+t_src];
	t_r[1+t_dst]=t_v[1+t_src];
	t_r[2+t_dst]=t_v[2+t_src];
	t_r[3+t_dst]=t_v[3+t_src];
}
function bb_math3d_Vec4Init(t_x,t_y,t_z,t_w,t_r){
	t_r[0]=t_x;
	t_r[1]=t_y;
	t_r[2]=t_z;
	t_r[3]=t_w;
}
function bb_math3d_Mat4Transform(t_m,t_v,t_r){
	bb_math3d_Vec4Init(t_m[0]*t_v[0]+t_m[4]*t_v[1]+t_m[8]*t_v[2]+t_m[12]*t_v[3],t_m[1]*t_v[0]+t_m[5]*t_v[1]+t_m[9]*t_v[2]+t_m[13]*t_v[3],t_m[2]*t_v[0]+t_m[6]*t_v[1]+t_m[10]*t_v[2]+t_m[14]*t_v[3],t_m[3]*t_v[0]+t_m[7]*t_v[1]+t_m[11]*t_v[2]+t_m[15]*t_v[3],t_r);
}
function bb_math3d_Mat4Ortho(t_left,t_right,t_bottom,t_top,t_znear,t_zfar,t_r){
	var t_w=t_right-t_left;
	var t_h=t_top-t_bottom;
	var t_d=t_zfar-t_znear;
	bb_math3d_Mat4Init2(2.0/t_w,0.0,0.0,0.0,0.0,2.0/t_h,0.0,0.0,0.0,0.0,2.0/t_d,0.0,-(t_right+t_left)/t_w,-(t_top+t_bottom)/t_h,-(t_zfar+t_znear)/t_d,1.0,t_r);
}
var bb_simplegame2_sgCanvas=null;
function c_SimplePoint(){
	Object.call(this);
	this.m_x=.0;
	this.m_y=.0;
}
c_SimplePoint.m_new=function(t_xPos,t_yPos){
	this.m_x=t_xPos;
	this.m_y=t_yPos;
	return this;
}
function c_SimpleObject(){
	c_SimplePoint.call(this);
	this.m_ray=null;
	this.m_color=null;
	this.m_name="";
	this.m_isCircle=false;
	this.m_inputRight=0;
	this.m_inputLeft=0;
	this.m_dead=false;
	this.m_visible=false;
	this.m_vx=.0;
	this.m_vy=.0;
	this.m_ax=.0;
	this.m_ay=.0;
	this.m_vr=.0;
	this.m_scaleX=.0;
	this.m_scaleY=.0;
	this.m_alpha=.0;
	this.m_vsx=.0;
	this.m_vsy=.0;
	this.m_va=.0;
	this.m_rotation=.0;
	this.m_image=null;
	this.m_width=.0;
	this.m_height=.0;
	this.m_halfWidth=.0;
	this.m_halfHeight=.0;
	this.m_bounded=false;
	this.m_rightBound=.0;
	this.m_leftBound=.0;
	this.m_bottomBound=.0;
	this.m_topBound=.0;
}
c_SimpleObject.prototype=extend_class(c_SimplePoint);
c_SimpleObject.m_new=function(){
	c_SimplePoint.m_new.call(this,0.0,0.0);
	this.m_ray=c_BLine.m_new.call(new c_BLine,0,0,0,0);
	this.m_color=c_SimpleColor.m_new.call(new c_SimpleColor,255,255,255);
	this.m_name="";
	this.m_isCircle=false;
	this.m_inputRight=0;
	this.m_inputLeft=0;
	this.m_dead=false;
	this.m_visible=true;
	return this;
}
c_SimpleObject.prototype.p_Init3=function(){
	this.m_x=0.0;
	this.m_y=0.0;
	this.m_vx=0.0;
	this.m_vy=0.0;
	this.m_ax=0.0;
	this.m_ay=0.0;
	this.m_vr=0.0;
	this.m_scaleX=1.0;
	this.m_scaleY=1.0;
	this.m_alpha=1.0;
	this.m_vsx=0.0;
	this.m_vsy=0.0;
	this.m_va=0.0;
	this.m_rotation=0.0;
	this.m_dead=false;
	this.m_visible=true;
	return 0;
}
c_SimpleObject.prototype.p_SetSize=function(t_width,t_height){
	this.m_width=t_width;
	this.m_height=t_height;
	this.m_halfWidth=t_width*0.5;
	this.m_halfHeight=t_height*0.5;
	return 0;
}
c_SimpleObject.prototype.p_SetImage=function(t_newImage){
	this.m_image=t_newImage;
	this.p_SetSize((this.m_image.p_Width()),(this.m_image.p_Height()));
	return 0;
}
c_SimpleObject.prototype.p_SetImage2=function(t_newImage,t_library){
	this.p_SetImage(t_library.p_GetImage(t_newImage));
	return 0;
}
c_SimpleObject.prototype.p_SetImage3=function(t_newImage){
	this.p_SetImage(c_Image2.m_Load(t_newImage,.5,.5,3,null));
	return 0;
}
c_SimpleObject.prototype.p_UpdateVelocity=function(){
	this.m_vx+=this.m_ax;
	this.m_vy+=this.m_ay;
	return 0;
}
c_SimpleObject.prototype.p_CheckBounds=function(){
	if(this.m_x>=this.m_rightBound){
		this.m_x=this.m_rightBound;
	}else{
		if(this.m_x<=this.m_leftBound){
			this.m_x=this.m_leftBound;
		}
	}
	if(this.m_y<=this.m_bottomBound){
		this.m_y=this.m_bottomBound;
	}else{
		if(this.m_y>=this.m_topBound){
			this.m_y=this.m_topBound;
		}
	}
	return 0;
}
c_SimpleObject.prototype.p_UpdatePosition=function(){
	this.m_x+=this.m_vx;
	this.m_y+=this.m_vy;
	if(this.m_bounded){
		this.p_CheckBounds();
	}
	return 0;
}
c_SimpleObject.prototype.p_UpdateRotation=function(){
	this.m_rotation+=this.m_vr;
	return 0;
}
c_SimpleObject.prototype.p_UpdateScale=function(){
	this.m_scaleX+=this.m_vsx;
	if(this.m_scaleX<=0.0){
		this.m_scaleX=0.0;
		this.m_vsx=0.0;
	}else{
		if(this.m_scaleX>=1.0){
			this.m_scaleX=1.0;
			this.m_vsx=0.0;
		}
	}
	this.m_scaleY+=this.m_vsy;
	if(this.m_scaleY<=0.0){
		this.m_scaleY=0.0;
		this.m_vsy=0.0;
	}else{
		if(this.m_scaleY>=1.0){
			this.m_scaleY=1.0;
			this.m_vsy=1.0;
		}
	}
	return 0;
}
c_SimpleObject.prototype.p_UpdateAlpha=function(){
	this.m_alpha+=this.m_va;
	if(this.m_alpha<=0.0){
		this.m_alpha=0.0;
		this.m_va=0.0;
	}else{
		if(this.m_alpha>=1.0){
			this.m_alpha=1.0;
			this.m_va=0.0;
		}
	}
	return 0;
}
c_SimpleObject.prototype.p_Update=function(){
	if(!this.m_dead){
		this.p_UpdateVelocity();
		this.p_UpdatePosition();
		this.p_UpdateRotation();
		this.p_UpdateScale();
		this.p_UpdateAlpha();
	}
	return 0;
}
c_SimpleObject.prototype.p_Launch=function(t_angle,t_speed){
	this.m_rotation=t_angle;
	this.m_vx=Math.cos((this.m_rotation)*D2R)*t_speed;
	this.m_vy=Math.sin((this.m_rotation)*D2R)*t_speed;
	return 0;
}
c_SimpleObject.prototype.p_Render3=function(t_offsetX,t_offsetY){
	if(this.m_visible && this.m_scaleX>0.0 && this.m_scaleY>0.0 && this.m_alpha>0.0){
		bb_simplegame2_sgCanvas.p_SetAlpha(this.m_alpha);
		if(this.m_image!=null){
			bb_simplegame2_sgCanvas.p_DrawImage2(this.m_image,this.m_x+t_offsetX,this.m_y+t_offsetY,-this.m_rotation,this.m_scaleX,this.m_scaleY);
		}else{
			bb_simplegame2_sgCanvas.p_SetColor(this.m_color.m_r,this.m_color.m_g,this.m_color.m_b);
			if(this.m_isCircle){
				bb_simplegame2_sgCanvas.p_DrawCircle(this.m_x,this.m_y,this.m_width*0.5,null);
			}else{
				bb_simplegame2_sgCanvas.p_DrawRect(this.m_x-this.m_halfWidth,this.m_y-this.m_halfHeight,this.m_width,this.m_height,null,0.0,0.0,1.0,1.0);
			}
			bb_simplegame2_sgCanvas.p_SetColor(255.0,255.0,255.0);
		}
		bb_simplegame2_sgCanvas.p_SetAlpha(1.0);
	}
	return 0;
}
function c_BLine(){
	Object.call(this);
	this.m_points=null;
	this.m_doneX=false;
	this.m_doneY=false;
}
c_BLine.prototype.p_Calculate=function(t_x0,t_y0,t_x1,t_y1,t_stepSize){
	this.m_points.p_Clear2();
	this.m_doneX=false;
	this.m_doneY=false;
	var t_dx=bb_math_Abs(t_x1-t_x0);
	var t_dy=bb_math_Abs(t_y1-t_y0);
	var t_sx=t_stepSize;
	if(t_x1<t_x0){
		t_sx=-t_stepSize;
	}
	var t_sy=t_stepSize;
	if(t_y1<t_y0){
		t_sy=-t_stepSize;
	}
	var t_err=t_dx-t_dy;
	while(true){
		this.m_points.p_Push16(c_SimplePoint.m_new.call(new c_SimplePoint,(t_x0),(t_y0)));
		if(t_x0==t_x1 && t_y0==t_y1){
			break;
		}
		var t_e2=t_err*2;
		if(t_e2>-t_dx){
			t_err-=t_dy;
			t_x0+=t_sx;
		}
		if(t_e2<t_dx){
			t_err+=t_dx;
			t_y0+=t_sy;
		}
	}
	return 0;
}
c_BLine.m_new=function(t_x0,t_y0,t_x1,t_y1){
	this.m_points=c_Stack6.m_new.call(new c_Stack6);
	this.p_Calculate(t_x0,t_y0,t_x1,t_y1,1);
	return this;
}
c_BLine.m_new2=function(){
	return this;
}
function c_Stack6(){
	Object.call(this);
	this.m_data=[];
	this.m_length=0;
}
c_Stack6.m_new=function(){
	return this;
}
c_Stack6.m_new2=function(t_data){
	this.m_data=t_data.slice(0);
	this.m_length=t_data.length;
	return this;
}
c_Stack6.m_NIL=null;
c_Stack6.prototype.p_Clear2=function(){
	for(var t_i=0;t_i<this.m_length;t_i=t_i+1){
		this.m_data[t_i]=c_Stack6.m_NIL;
	}
	this.m_length=0;
}
c_Stack6.prototype.p_Push16=function(t_value){
	if(this.m_length==this.m_data.length){
		this.m_data=resize_object_array(this.m_data,this.m_length*2+10);
	}
	this.m_data[this.m_length]=t_value;
	this.m_length+=1;
}
c_Stack6.prototype.p_Push17=function(t_values,t_offset,t_count){
	for(var t_i=0;t_i<t_count;t_i=t_i+1){
		this.p_Push16(t_values[t_offset+t_i]);
	}
}
c_Stack6.prototype.p_Push18=function(t_values,t_offset){
	this.p_Push17(t_values,t_offset,t_values.length-t_offset);
}
function bb_math_Abs(t_x){
	if(t_x>=0){
		return t_x;
	}
	return -t_x;
}
function bb_math_Abs2(t_x){
	if(t_x>=0.0){
		return t_x;
	}
	return -t_x;
}
function c_SimpleColor(){
	Object.call(this);
	this.m_r=.0;
	this.m_g=.0;
	this.m_b=.0;
}
c_SimpleColor.prototype.p_Set7=function(t_r,t_g,t_b){
	this.m_r=(t_r)/255.0;
	this.m_g=(t_g)/255.0;
	this.m_b=(t_b)/255.0;
	return 0;
}
c_SimpleColor.m_new=function(t_r,t_g,t_b){
	this.p_Set7(t_r,t_g,t_b);
	return this;
}
function c_SimpleLib(){
	Object.call(this);
	this.m_loadedImages=null;
}
c_SimpleLib.prototype.p_AddImage=function(t_filename){
	if(this.m_loadedImages.p_Get2(t_filename)==null){
		var t_newImage=c_Image2.m_Load(t_filename,.5,.5,3,null);
		this.m_loadedImages.p_Set8(t_filename,t_newImage);
	}
	return 0;
}
c_SimpleLib.prototype.p_GetImage=function(t_filename){
	if(this.m_loadedImages.p_Get2(t_filename)==null){
		this.p_AddImage(t_filename);
	}
	return this.m_loadedImages.p_Get2(t_filename);
}
function c_Map7(){
	Object.call(this);
	this.m_root=null;
}
c_Map7.prototype.p_Compare2=function(t_lhs,t_rhs){
}
c_Map7.prototype.p_FindNode2=function(t_key){
	var t_node=this.m_root;
	while((t_node)!=null){
		var t_cmp=this.p_Compare2(t_key,t_node.m_key);
		if(t_cmp>0){
			t_node=t_node.m_right;
		}else{
			if(t_cmp<0){
				t_node=t_node.m_left;
			}else{
				return t_node;
			}
		}
	}
	return t_node;
}
c_Map7.prototype.p_Get2=function(t_key){
	var t_node=this.p_FindNode2(t_key);
	if((t_node)!=null){
		return t_node.m_value;
	}
	return null;
}
c_Map7.prototype.p_RotateLeft7=function(t_node){
	var t_child=t_node.m_right;
	t_node.m_right=t_child.m_left;
	if((t_child.m_left)!=null){
		t_child.m_left.m_parent=t_node;
	}
	t_child.m_parent=t_node.m_parent;
	if((t_node.m_parent)!=null){
		if(t_node==t_node.m_parent.m_left){
			t_node.m_parent.m_left=t_child;
		}else{
			t_node.m_parent.m_right=t_child;
		}
	}else{
		this.m_root=t_child;
	}
	t_child.m_left=t_node;
	t_node.m_parent=t_child;
	return 0;
}
c_Map7.prototype.p_RotateRight7=function(t_node){
	var t_child=t_node.m_left;
	t_node.m_left=t_child.m_right;
	if((t_child.m_right)!=null){
		t_child.m_right.m_parent=t_node;
	}
	t_child.m_parent=t_node.m_parent;
	if((t_node.m_parent)!=null){
		if(t_node==t_node.m_parent.m_right){
			t_node.m_parent.m_right=t_child;
		}else{
			t_node.m_parent.m_left=t_child;
		}
	}else{
		this.m_root=t_child;
	}
	t_child.m_right=t_node;
	t_node.m_parent=t_child;
	return 0;
}
c_Map7.prototype.p_InsertFixup7=function(t_node){
	while(((t_node.m_parent)!=null) && t_node.m_parent.m_color==-1 && ((t_node.m_parent.m_parent)!=null)){
		if(t_node.m_parent==t_node.m_parent.m_parent.m_left){
			var t_uncle=t_node.m_parent.m_parent.m_right;
			if(((t_uncle)!=null) && t_uncle.m_color==-1){
				t_node.m_parent.m_color=1;
				t_uncle.m_color=1;
				t_uncle.m_parent.m_color=-1;
				t_node=t_uncle.m_parent;
			}else{
				if(t_node==t_node.m_parent.m_right){
					t_node=t_node.m_parent;
					this.p_RotateLeft7(t_node);
				}
				t_node.m_parent.m_color=1;
				t_node.m_parent.m_parent.m_color=-1;
				this.p_RotateRight7(t_node.m_parent.m_parent);
			}
		}else{
			var t_uncle2=t_node.m_parent.m_parent.m_left;
			if(((t_uncle2)!=null) && t_uncle2.m_color==-1){
				t_node.m_parent.m_color=1;
				t_uncle2.m_color=1;
				t_uncle2.m_parent.m_color=-1;
				t_node=t_uncle2.m_parent;
			}else{
				if(t_node==t_node.m_parent.m_left){
					t_node=t_node.m_parent;
					this.p_RotateRight7(t_node);
				}
				t_node.m_parent.m_color=1;
				t_node.m_parent.m_parent.m_color=-1;
				this.p_RotateLeft7(t_node.m_parent.m_parent);
			}
		}
	}
	this.m_root.m_color=1;
	return 0;
}
c_Map7.prototype.p_Set8=function(t_key,t_value){
	var t_node=this.m_root;
	var t_parent=null;
	var t_cmp=0;
	while((t_node)!=null){
		t_parent=t_node;
		t_cmp=this.p_Compare2(t_key,t_node.m_key);
		if(t_cmp>0){
			t_node=t_node.m_right;
		}else{
			if(t_cmp<0){
				t_node=t_node.m_left;
			}else{
				t_node.m_value=t_value;
				return false;
			}
		}
	}
	t_node=c_Node7.m_new.call(new c_Node7,t_key,t_value,-1,t_parent);
	if((t_parent)!=null){
		if(t_cmp>0){
			t_parent.m_right=t_node;
		}else{
			t_parent.m_left=t_node;
		}
		this.p_InsertFixup7(t_node);
	}else{
		this.m_root=t_node;
	}
	return true;
}
function c_StringMap5(){
	c_Map7.call(this);
}
c_StringMap5.prototype=extend_class(c_Map7);
c_StringMap5.prototype.p_Compare2=function(t_lhs,t_rhs){
	return string_compare(t_lhs,t_rhs);
}
function c_Node7(){
	Object.call(this);
	this.m_key="";
	this.m_right=null;
	this.m_left=null;
	this.m_value=null;
	this.m_color=0;
	this.m_parent=null;
}
c_Node7.m_new=function(t_key,t_value,t_color,t_parent){
	this.m_key=t_key;
	this.m_value=t_value;
	this.m_color=t_color;
	this.m_parent=t_parent;
	return this;
}
c_Node7.m_new2=function(){
	return this;
}
function c_Stack7(){
	Object.call(this);
	this.m_data=[];
	this.m_length=0;
}
c_Stack7.m_new=function(){
	return this;
}
c_Stack7.m_new2=function(t_data){
	this.m_data=t_data.slice(0);
	this.m_length=t_data.length;
	return this;
}
c_Stack7.m_NIL=null;
c_Stack7.prototype.p_Length=function(t_newlength){
	if(t_newlength<this.m_length){
		for(var t_i=t_newlength;t_i<this.m_length;t_i=t_i+1){
			this.m_data[t_i]=c_Stack7.m_NIL;
		}
	}else{
		if(t_newlength>this.m_data.length){
			this.m_data=resize_object_array(this.m_data,bb_math_Max(this.m_length*2+10,t_newlength));
		}
	}
	this.m_length=t_newlength;
}
c_Stack7.prototype.p_Length2=function(){
	return this.m_length;
}
c_Stack7.prototype.p_Pop=function(){
	this.m_length-=1;
	var t_v=this.m_data[this.m_length];
	this.m_data[this.m_length]=c_Stack7.m_NIL;
	return t_v;
}
c_Stack7.prototype.p_Push19=function(t_value){
	if(this.m_length==this.m_data.length){
		this.m_data=resize_object_array(this.m_data,this.m_length*2+10);
	}
	this.m_data[this.m_length]=t_value;
	this.m_length+=1;
}
c_Stack7.prototype.p_Push20=function(t_values,t_offset,t_count){
	for(var t_i=0;t_i<t_count;t_i=t_i+1){
		this.p_Push19(t_values[t_offset+t_i]);
	}
}
c_Stack7.prototype.p_Push21=function(t_values,t_offset){
	this.p_Push20(t_values,t_offset,t_values.length-t_offset);
}
c_Stack7.prototype.p_ObjectEnumerator=function(){
	return c_Enumerator.m_new.call(new c_Enumerator,this);
}
c_Stack7.prototype.p_Equals=function(t_lhs,t_rhs){
	return t_lhs==t_rhs;
}
c_Stack7.prototype.p_RemoveEach=function(t_value){
	var t_i=0;
	var t_j=this.m_length;
	while(t_i<this.m_length){
		if(!this.p_Equals(this.m_data[t_i],t_value)){
			t_i+=1;
			continue;
		}
		var t_b=t_i;
		var t_e=t_i+1;
		while(t_e<this.m_length && this.p_Equals(this.m_data[t_e],t_value)){
			t_e+=1;
		}
		while(t_e<this.m_length){
			this.m_data[t_b]=this.m_data[t_e];
			t_b+=1;
			t_e+=1;
		}
		this.m_length-=t_e-t_b;
		t_i+=1;
	}
	t_i=this.m_length;
	while(t_i<t_j){
		this.m_data[t_i]=c_Stack7.m_NIL;
		t_i+=1;
	}
}
function c_SimpleGroup(){
	c_Stack7.call(this);
}
c_SimpleGroup.prototype=extend_class(c_Stack7);
c_SimpleGroup.m_new=function(){
	c_Stack7.m_new.call(this);
	return this;
}
c_SimpleGroup.prototype.p_Update=function(){
	var t_=this.p_ObjectEnumerator();
	while(t_.p_HasNext()){
		var t_obj=t_.p_NextObject();
		t_obj.p_Update();
	}
	return 0;
}
c_SimpleGroup.prototype.p_Render3=function(t_offsetX,t_offsetY){
	var t_=this.p_ObjectEnumerator();
	while(t_.p_HasNext()){
		var t_obj=t_.p_NextObject();
		t_obj.p_Render3(t_offsetX,t_offsetY);
	}
	return 0;
}
function c_SimplePool(){
	Object.call(this);
	this.m_objects=null;
}
c_SimplePool.m_new=function(){
	this.m_objects=c_Stack7.m_new.call(new c_Stack7);
	return this;
}
c_SimplePool.prototype.p_Get3=function(){
	var t_newObj=null;
	if(this.m_objects.p_Length2()>0){
		t_newObj=this.m_objects.p_Pop();
	}else{
		t_newObj=c_SimpleObject.m_new.call(new c_SimpleObject);
	}
	return t_newObj;
}
c_SimplePool.prototype.p_Recycle=function(t_deadObj){
	this.m_objects.p_Push19(t_deadObj);
	return 0;
}
function bb_input_MouseHit(t_button){
	return bb_input_device.p_KeyHit(1+t_button);
}
function bb_input_MouseDown(t_button){
	return ((bb_input_device.p_KeyDown(1+t_button))?1:0);
}
var bb_random_Seed=0;
function bb_random_Rnd(){
	bb_random_Seed=bb_random_Seed*1664525+1013904223|0;
	return (bb_random_Seed>>8&16777215)/16777216.0;
}
function bb_random_Rnd2(t_low,t_high){
	return bb_random_Rnd3(t_high-t_low)+t_low;
}
function bb_random_Rnd3(t_range){
	return bb_random_Rnd()*t_range;
}
function bb_input_MouseX(){
	return bb_input_device.p_MouseX();
}
function bb_input_MouseY(){
	return bb_input_device.p_MouseY();
}
function c_Enumerator(){
	Object.call(this);
	this.m_stack=null;
	this.m_index=0;
}
c_Enumerator.m_new=function(t_stack){
	this.m_stack=t_stack;
	return this;
}
c_Enumerator.m_new2=function(){
	return this;
}
c_Enumerator.prototype.p_HasNext=function(){
	return this.m_index<this.m_stack.p_Length2();
}
c_Enumerator.prototype.p_NextObject=function(){
	this.m_index+=1;
	return this.m_stack.m_data[this.m_index-1];
}
function bb_filepath_ExtractExt(t_path){
	var t_i=t_path.lastIndexOf(".");
	if(t_i!=-1 && t_path.indexOf("/",t_i+1)==-1 && t_path.indexOf("\\",t_i+1)==-1){
		return t_path.slice(t_i+1);
	}
	return "";
}
function bb_filepath_StripExt(t_path){
	var t_i=t_path.lastIndexOf(".");
	if(t_i!=-1 && t_path.indexOf("/",t_i+1)==-1 && t_path.indexOf("\\",t_i+1)==-1){
		return t_path.slice(0,t_i);
	}
	return t_path;
}
function c_NodeEnumerator(){
	Object.call(this);
	this.m_node=null;
}
c_NodeEnumerator.m_new=function(t_node){
	this.m_node=t_node;
	return this;
}
c_NodeEnumerator.m_new2=function(){
	return this;
}
c_NodeEnumerator.prototype.p_HasNext=function(){
	return this.m_node!=null;
}
c_NodeEnumerator.prototype.p_NextObject=function(){
	var t_t=this.m_node;
	this.m_node=this.m_node.p_NextNode();
	return t_t;
}
function bbInit(){
	bb_app__app=null;
	bb_app__delegate=null;
	bb_app__game=BBGame.Game();
	bb_graphics_device=null;
	bb_graphics_context=c_GraphicsContext.m_new.call(new c_GraphicsContext);
	c_Image.m_DefaultFlags=0;
	bb_audio_device=null;
	bb_input_device=null;
	bb_app__devWidth=0;
	bb_app__devHeight=0;
	bb_app__displayModes=[];
	bb_app__desktopMode=null;
	bb_graphics_renderDevice=null;
	bb_app__updateRate=0;
	bb_simplegame2_sgWorldWidth=0;
	bb_simplegame2_sgWorldHeight=0;
	bb_graphics2_inited=false;
	bb_graphics2_vbosSeq=0;
	bb_graphics2_rs_vbo=0;
	bb_graphics2_rs_ibo=0;
	bb_graphics2_tmpi=new_number_array(16);
	bb_graphics2_defaultFbo=0;
	bb_graphics2_mainShader="";
	bb_glutil_tmpi=new_number_array(16);
	bb_graphics2_fastShader=null;
	bb_graphics2_bumpShader=null;
	bb_graphics2_matteShader=null;
	bb_graphics2_shadowShader=null;
	bb_graphics2_lightMapShader=null;
	bb_graphics2_defaultShader=null;
	c_Texture.m__white=null;
	c_Texture.m__colors=c_IntMap2.m_new.call(new c_IntMap2);
	bb_graphics2_defaultFont=null;
	bb_graphics2_flipYMatrix=bb_math3d_Mat4New();
	c_Canvas.m__active=null;
	bb_graphics2_rs_program=null;
	bb_graphics2_rs_numLights=0;
	bb_graphics2_rs_material=null;
	bb_graphics2_rs_modelViewProjMatrix=bb_math3d_Mat4New();
	bb_graphics2_rs_modelViewMatrix=bb_math3d_Mat4New();
	bb_graphics2_rs_clipPosScale=[1.0,1.0,1.0,1.0];
	bb_graphics2_rs_globalColor=[1.0,1.0,1.0,1.0];
	bb_graphics2_rs_fogColor=[0.0,0.0,0.0,0.0];
	bb_graphics2_rs_ambientLight=[0.0,0.0,0.0,1.0];
	bb_graphics2_rs_lightColors=new_number_array(16);
	bb_graphics2_rs_lightVectors=new_number_array(16);
	bb_graphics2_rs_shadowTexture=null;
	bb_graphics2_rs_blend=-1;
	c_Stack3.m_NIL=null;
	bb_graphics2_freeOps=c_Stack3.m_new.call(new c_Stack3);
	bb_graphics2_nullOp=c_DrawOp.m_new.call(new c_DrawOp);
	c_Stack4.m_NIL=null;
	c_Stack5.m_NIL=0;
	bb_graphics2_rs_projMatrix=bb_math3d_Mat4New();
	bb_simplegame2_sgCanvas=null;
	c_Stack6.m_NIL=null;
	c_Stack7.m_NIL=null;
	bb_random_Seed=1234;
	c_Texture.m__black=null;
	c_Texture.m__flat=null;
}
//${TRANSCODE_END}
