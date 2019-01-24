<?php

class Reader
{
	function __construct()
	{
		
	}
	
	function read(){}
	function ready(){}
	function close(){}
	function skip($counter=1){}
	function reset(){}
   
   	function is( &$object )
   	{
   		return is_subclass_of( $object, __CLASS__ );
   	}
}

class FileReader extends Reader
{
	var $handle 	= null;
	
	
	//function FileReader( $file )
	function __construct($file)
	{
		if ( $file != '' )
		{
			$this->handle = @fopen( $file, 'r' );
		}
	}
	
	function ready()
	{
		return isset( $this->handle );
	}
	
	function skip( $count = 1 )
	{
		if ( $this->ready() == false || $count <= 0) return;
      	return fseek( $this->handle, intval( $count ), SEEK_CUR );
	}
	
	function read( $length = 1 )
	{
		if ( !$this->ready() )
      		return '';
      	if ( is_resource( $this->handle ) )
			return ( $length == 1 ? fgetc( $this->handle ) : fread( $this->handle, $length ) );
		return '';
	}
	
	function reset()
	{
		if ( !$this->ready() )
      		return;
      	@rewind( $this->handle );
	}
	
	function close()
	{
		if ( !$this->ready() )
      		return;
      	@fclose( $this->handle );
	}
	
	function isEOF()
	{
		return feof( $this->handle );
	}
	
	function cursorPosition()
	{
		if ( !$this->ready() )  
      		return -1;
      	return ftell( $this->handle );
	}

	// static function to read direct all file content
	function readFile( $file, $binary = false )
	{
		$content = '';
		if ( file_exists( $file ) )
		{
			$handle = @fopen( $file, 'rb' ); 
			if ( is_resource( $handle ) ) 
			{
				while ( false !== ( $c = fgetc( $handle ) ) )
				{
					$content .= $c;
				}
				fclose( $handle ); 
			}
		}
		return $content;
   }
   
   function is(&$object)
   {
      return is_subclass_of( $object, __CLASS__ );
   }
}

class FilterReader extends Reader
{
   var $reader = NULL;
	
	
	//function FilterReader( &$reader )
	function __construct( &$reader )
	{
		parent::__construct();
		if ( Reader::is( $reader ) )
      		$this->reader =& $reader;
	}
	
	function read()
   	{
      return $this->reader->read();
   	}
	
   	function ready()
   	{
		return $this->reader->ready();
   	}
	
   	function close()
   	{
      	$this->reader->close();
   	}
	
   	function skip( $counter = 1 )
   	{
      	$this->reader->skip($counter);
   	}
	
   	function reset()
   	{
      	$this->reader->reset();
   	}
   
   	function is(&$object)
   	{
      	return is_subclass_of( $object, __CLASS__ );
   	}
}

define( 'CSV_EOL', 1 );	// end of the line
define( 'CSV_EOF', 2 ); // end of the file
define( 'CSV_EOC', 0 ); // end of the cell

class CSVReader extends FilterReader
{
	var $separator		= ',';
	
	var $lineCount		= 0;
	var $convertEscape	= true;
	
	//function CSVReader( &$reader )
	function __construct( &$reader )
	{
		parent::__construct( $reader );
	}
	
	function setSeparator( $c )
	{
		$this->separator = substr( $c , 0, 1 );	
	}
	
	function getSeparator()
	{
		return $this->separator;	
	}
	
	// skip current line
	function _skipLine()
	{
		$c = $this->read();	
		while( $c != '' && $c != "\n" )
			$c = $this->read();	
		$this->lineCount++;
	}
		
	function all()
	{
		$res = array();
		while( false !== ( $cell = $t->next() ) )
		{
			$res[] = $cell;
		}
		$res;
	}

	function next()
	{
		$cell	= array();
		$c 		= $this->read();
		$p		= '';
		$buff 	= '';
		$quote 	= 0;
		while ( true )
		{
			if ( $c == '' )
			{
				if ( $buff != '' )
				{
					$cell[] = $buff;	
				}
				return sizeof( $cell ) != 0 ? $cell : false;	
			}
			elseif ( ( $c == $this->getSeparator() || $c == "\n" ) && 0 == ( $quote % 2 ) )
			{
				if ( $quote != 0 )
				{
					$i = strrpos( $buff, '"' );
					$buff = substr( $buff, 0, $i );
				}
				$cell[] = $buff;
				if ( $c == "\n" )
				{
					$this->lineCount++;
					return $cell;
				}
				$buff 	= '';
				$quote 	= 0;
			}
			elseif ( $c == "\\" && $this->convertEscape )
			{
				// slash
				$c = $this->read();
				switch ( $c )
				{
					case '"':
						$buff .= '"';
						break;
					case "'":
						$buff .= "'";
						break;
					case 'x':
						// hex
						$c = $this->read();
						$_tmp = '';
						while ( ( ord( $c ) >= 48 && ord( $c ) <= 57 ) || ( ord( $c ) >= 65 && ord( $c ) <= 70 ) || ( ord( $c ) >= 97 && ord( $c ) <= 102 ) )
						{
							$_tmp .= $c;
						}
						eval( "\$_tmp = \\x{$_tmp};" );
						$buff .= $_tmp;
						break;
					case '0':
					case '1':
					case '2':
					case '3':
					case '4':
					case '5':
					case '6':
					case '7':
					case '8':
					case '9':
						$_tmp = $c;
						$c = $this->read();
						while ( ( ord( $c ) >= 48 && ord( $c ) <= 57 ) )
						{
							$_tmp .= $c;
							$c = $this->read();
						}						
						eval( "\$_tmp = \\{$_tmp};" );
						$buff .= $_tmp;
						// octal
						break;
					default:
						$buff .= "\\".$c;
					
				}
			}
//			elseif ( ( $c == '!' || $c == '#' || $c == ';' ) && $buff == '' ) 
//			{
//				// comment
//				$this->_skipLine();
//			}
			elseif ( $c == '"' ) 
			{
				if ( ( $quote % 2 ) != 0 )
					$buff .= $c;
				$quote++;				
			}
			else 
			{
				if ( $c != "\r" )
				{
					if ( $c == "\n" )
						$this->lineCount++;
					$buff .= $c;	
				}
			}
			$c = $this->read();
		}
	}
   
   function is(&$object)
   {
      return is_subclass_of( $object, __CLASS__ );
   }
}