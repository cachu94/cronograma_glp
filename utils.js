function Cls() //borra el calendario
{
var i=0
for (i=0;i<42;i++)
{
	document.getElementById('td'+i).innerHTML='';
}
}


function FormatCalendar(f)
{

var i
var ini=new Date(f.getFullYear(),f.getMonth(),1);
var fin=new Date(f.getFullYear(),f.getMonth(),DiasMes(f.getFullYear(),f.getMonth()));

for (i=1;i<=EmplesCount;i++)
{
	if (EmpleActivo (IdEmples[i],ini,fin)==true) 
	{
		document.getElementById('id'+ IdEmples[i]).style.display='block';
	}
	else
	{
		document.getElementById('id'+ IdEmples[i]).style.display='none';
	}
}


Cls();
document.getElementById('titmes').innerHTML=NombreMes(f.getMonth()) + '-' + f.getFullYear();
var s=DiaSem(f);
var dm=DiasMes(f.getFullYear(),f.getMonth()) //dias en mes actual
var dma=DiasMes(f.getFullYear(),MesAnt(f.getMonth())) //dias en mes anterior

for (i=0;i<s;i++)
{
	document.getElementById('th'+i).innerHTML=dma-s+i+1;
	document.getElementById('th'+i).className='otromes';
	document.getElementById('td'+i).className='otromes';

}
for (i=s;i<dm+s;i++)
{
	var g=new Date(f.getFullYear(),f.getMonth(), i-s+1)
	document.getElementById('th'+i).innerHTML=i-s+1;
	document.getElementById('th'+i).className='estemes';
	if (EsFestivo(g) == true)
	{
		document.getElementById('td'+i).className='estemesf';
	}
	else
	{
		document.getElementById('td'+i).className='estemes';
	}
}
for (i=dm+s;i<42;i++)
{
	document.getElementById('th'+i).innerHTML=i+1-(dm+s);
	document.getElementById('th'+i).className='otromes';
	document.getElementById('td'+i).className='otromes';
}
}


function NombreMes(mm)
{
switch (mm)
{
  case 0: return 'enero';
          break;
  case 1: return 'febrero';
          break;
  case 2: return 'marzo';
          break;
  case 3: return 'abril';
          break;
  case 4: return 'mayo';
          break;
  case 5: return 'junio';
          break;
  case 6: return 'julio';
          break;
  case 7: return 'agosto';
          break;
  case 8: return 'septiembre';
          break;
  case 9: return 'octubre';
          break;
  case 10: return 'noviembre';
          break;
  case 11: return 'diciembre';
          break;
}
}


function EsFestivo(fff)
{
var m=fff.getMonth();
var d=fff.getDate();
var ds=fff.getDay()+1;
var i

if (f1 > 0) {if (ds==f1) {return true}}
if (f2 > 0) {if (ds==f2) {return true}}

if (a1 !==undefined)
{
for ( i=0; i < a1.length; i++ )
{
	if (a1[i].getTime() == fff.getTime())
		return true;
}
}

if (a2 !== undefined)
{
for ( i=0; i < a2.length; i++ )
{
	if (a2[i].mes == m && a2[i].dia == d)
		return true;
}
}
return false;
}


function DiasMes(y,m)
{
if (m==0||m==2||m==4||m==6||m==7||m==9||m==11)
{
	return 31
}
else
{
	if (m==3||m==5||m==8||m==10)
	{
		return 30
	}
	else // m==1 (febrero)
	{
		return days_between(new Date(y,1,1),new Date(y,2,1))
	}
}
}

function MesAnt(m)
{
if (m==0)
	return 11
else
	return m-1
}

function DiaSem(f)
{
s=f.getDay() - 1 //0-lunes, 1-martes,...,6-domingo
if (s==-1)
{
s=6;
}
return s
}

function days_between(date1, date2) 
{ 
    var ONE_DAY = 1000 * 60 * 60 * 24
    var date1_ms = date1.getTime()
    var date2_ms = date2.getTime()
    var difference_ms = Math.abs(date1_ms - date2_ms)
    return Math.round(difference_ms/ONE_DAY)
}

function BuscaTramos(ab)
{
if (t[ab]==undefined)
{
return ab
}
else
{
return t[ab]
}
}




function RellenaCalendar(m,e)
{
var elem=document.getElementById('emples');
var i=0;
var ch;
id=e;
for (i=0;i<elem.childNodes.length;i++)
{
	ch=elem.childNodes[i];
	if (ch.nodeName=='P') 
	{
		if (ch.id=='id' + e)
		{
			ch.className='select';
		}
		else
		{
			ch.className='';
		}

	}
}

am=new String(m)
y=am.substring(0,4);
v=am.substring(4,am.length);
f=new Date(y,v,1);
s=DiaSem(f);
dm=DiasMes(y,v);
if (!EmpleActivo(e,f,new Date(y,v,DiasMes(y,v))))
{
	Cls();
	return; //si el empleado no está activo borra la pantalla y sale
}

if (T[am] !== undefined)
{
	if (T[am][e] !== undefined)
	{
		for (i=0;i<dm;i++)
		{
			if (T[am][e][i] !== undefined)
			{
				if (h==true)
				{
					document.getElementById('td'+(i+s)).innerHTML=BuscaTramos(T[am][e][i]);
				}
				else
				{
					document.getElementById('td'+(i+s)).innerHTML=T[am][e][i];
				}
			}
			else
			{
				document.getElementById('td'+(i+s)).innerHTML='';
			}
		}
	}
	else
	{
		Cls();
	}
}
else
{
	Cls();
}
}


function EmpleActivo(i,ini,fin)
{
var bolRes=true;
if (antig[i]>0)
{
	if (antig[i]>fin)
	{
		bolRes=false;
	}
}
if (cese[i]>0)
{
	if (cese[i]<ini)
	{
		bolRes=false;
	}
}	
return bolRes
}




function PrimerEmpleActivo(y,m)
{
var i=0;
for (i=1;i<=EmplesCount;i++)
{
	var ini=new Date(y,m,1);
	var fin=new Date(y,m,DiasMes(y,m));
	if (EmpleActivo (IdEmples[i],ini,fin)==true) 
	{
		return IdEmples[i];
	}
}
}
