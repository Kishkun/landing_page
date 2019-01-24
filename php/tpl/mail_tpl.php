<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title></title>

</head>
<body>
	
	<div style="padding:30px 0;font-size:14px;color:#333; font-family:Arial, Helvetica, sans-serif;">	
	
      <div style="padding:15px 0 15px 0; margin:0 0 10px 0; font-size:20px; "><?php echo $title_mail  ?> <span><?php echo $_SERVER['HTTP_HOST']  ?></span></div> 
		
	  <div style="padding:10px 0; font-size:18px; margin-top: 20px; font-weight: bold;">Контактные данные:</div>
	  <?php if ( isset($data->name) ): ?>
		  <div style="padding:3px 0;">
			<b>ФИО:</b> <span style="color:#003;"><?php echo $data->name; ?></span>
		  </div> 
	  <?php endif; ?>	  
       
      <div  style="padding:3px 0;">
      	<b>Телефон:</b>  <span style="color:#003;"><?php echo $data->phone; ?></span>
      </div> 
	  
	  <?php if ( isset($data->email) ): ?>
		  <div style="padding:3px 0;">
			<b>Enail:</b> <span style="color:#003;"><?php echo $data->email; ?></span>
		  </div> 
	  <?php endif; ?>	
	  
	  	  
	  
	    <div style="padding:10px 0; font-size:18px; margin-top: 20px; text-decoration:underline;">Расчет стоимости доставки:</div>
		<div style="max-width: 900px;">
			<div class="or-ln" style="padding:4px 0; font-size:18px; margin-top: 20px;"> 
				<span style="display:inline-block; width:50%;">Направление:</span> 
				<span style="display:inline-block; color:#000; font-weight:bold;  width:48%;"><?php echo $data->data->route_name; ?> </span>  
			</div> 
			<div class="or-ln" style="padding:4px 0; font-size:18px; margin-top: 20px;"> 
				<span style="display:inline-block; width:50%;">Вес груза:</span> 
				<span style="display:inline-block; color:#000; font-weight:bold;  width:48%;"><?php echo $data->data->weight; ?> кг</span>  
			</div> 
			<div class="or-ln" style="padding:4px 0; font-size:18px; margin-top: 20px;"> 
				<span style="display:inline-block; width:50%;">Объем груза:</span> 
				<span style="display:inline-block; color:#000; font-weight:bold;  width:48%;"><?php echo $data->data->volume; ?> м.куб.</span>  
			</div>
			
			<?php if ( $data->data->calculation_enable ): ?>
				<div class="or-ln" style="padding:4px 0; font-size:18px; margin-top: 20px;"> 
					<span style="display:inline-block; width:50%;">Стоимость доставки:</span> 
					<span style="display:inline-block; color:#E62C2C; font-weight:bold;  width:48%;">
					
					 <?php echo $data->data->total_usd; ?> USD / <?php echo $data->data->total_byn; ?> BYN / <?php echo $data->data->total_rur; ?> RUB 
					</span>  
				</div> 
			<?php else : ?>	
				<div class="or-ln" style="padding:4px 0; font-size:18px; margin-top: 20px;"> 
					<span style="display:inline-block; width:50%;">Стоимость доставки:</span> 
					<span style="display:inline-block; color:#E62C2C; font-weight:bold;  width:48%;">
					
					   --
					</span>  
				</div> 
			
			<?php endif; ?>	
		</div>
	  
	</div> 
</body>
</html>
  
	  

