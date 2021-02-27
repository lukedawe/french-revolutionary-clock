function Update()       
    today = os.time(os.date('!*t'))
    day = os.date("%d", today)
    month = os.date("%m", today)
    year = os.date("%Y", today)  
    -- ----[ the following can be used for testing ] 
    -- day =1
    -- month = 6
    -- year = 2012
    -- print("test date:  "..day.." / "..month.." / "..year)
    --  --------------------------------
    addday=0
   SKIN:Bang('!SetOption', 'MtShowGregorianDate', 'Text', ("Gregorian Date :    "..day.." / " ..month.." / "..year))
   tIslamicDate = kuwaiticalendar(addday)	
   SKIN:Bang('!SetOption', 'MtShowIslamicDate', 'Text', ("Islamic Date :         "..tIslamicDate[5].." / " ..tIslamicDate[6].." / "..tIslamicDate[7]))
   SKIN:Bang('!SetOption', 'MtShowTextDate', 'Text',  writeIslamicDate(addday) )
   return 'dates refreshed....'
end -- function Update		

function kuwaiticalendar(adjust)	
   local day=tonumber(day)
   local m = tonumber(month)
   local y = tonumber(year)
   if (m<3) then  y = y-1	m = m+12	end

   a = math.floor(y/100)
   b = 2-a+math.floor(a/4)	
   if (y<1583) then b = 0 end
   if (y==1582) then
       if (m>10)  then b = b-10 end
       if (m==10) then	b = 0 end
       if (day>4) then b = b-10 end
   end
   jd = math.floor(365.25*(y+4716))+math.floor(30.6001*(m+1))+day+b-1524

   b = 0
   if (jd>2299160) then
       a = math.floor((jd-1867216.25)/36524.25)
       b = 1+a-math.floor(a/4)
   end
   
   bb = jd+b+1524
   cc = math.floor((bb-122.1)/365.25)
   dd = math.floor(365.25*cc)
   ee = math.floor((bb-dd)/30.6001)
   day =(bb-dd)-math.floor(30.6001*ee)
   month = ee-1
   if (ee>13) then
       cc = cc+ 1
       month = ee-13
   end
   year = cc-4716
   if (adjust) then	wd = gmod(jd+1-adjust,7)+1
          else 	wd = gmod(jd+1,7)+1
   end
   iyear = 10631./30.
   epochastro = 1948084
   epochcivil = 1948085
   shift1 = 8.01/60.
   z = jd-epochastro
   cyc = math.floor(z/10631.)
   z = z-10631*cyc
   j = math.floor((z-shift1)/iyear)
   iy = 30*cyc+j
   z = z-math.floor(j*iyear+shift1)
   im = math.floor((z+28.5001)/29.5)
   if (im==13) then im = 12 end
   id = z-math.floor(29.5001*im-29)

   myRes = {}
   myRes[0] = day  --  calculated day (CE)
   myRes[1] = month-1  --  calculated month (CE)
   myRes[2] = year  --  calculated year (CE)
   myRes[3] = jd  --  julian day number
   myRes[4] = wd  --  weekday number
   myRes[5] = id-1  --  islamic date (modified with -1)
   myRes[6] = im  --  islamic month
   myRes[7] = iy  --  islamic year
return myRes
end  -- of kuwaiticalendar

function gmod(n,m)
return ((n%m)+m)%m
end	

function writeIslamicDate(adjustment) 
local wdNames = {"al-Ahad","al-Ithnayn","ath-Thalaathaa","al-Arba‘aa’","al-Khamis","al-Jumu‘ah","as-Sabt"}
local iMonthNames = {"Muharram","Safar","Rabi'al-Awwal","Rabi al-Akhir","Jumada I","Jumada II","Rajab","Sha'ban","Ramadan","Shawwal","Dhu al-Qi'da","Dhu al-Hijja"}
local iDate = kuwaiticalendar(adjustment)
outputIslamicDate = (" "..wdNames[iDate[4]]..", "..iDate[5].." "..iMonthNames[iDate[6]].." "..iDate[7].." AH")
return outputIslamicDate
end -- of writeIslamicDate

--[][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][]][][][][][][][][][][][][][][][][][][][][][][][]][][][][][][][][][][][][][][][][][][][
-- The script was 'translated' from JavaScript on alhabib -> http://www.al-habib.info/islamic-calendar/hijricalendartext.htm
-- The Islamic Month and Day Number were both adjusted (+/- 1) to be more consistent with results from the sites listed below.
-- The adjustment value has been left in but setting it to =1 does not seem to produce more consitent results.
--
--  1) http://www.muslimphilosophy.com/ip/hijri.htm
-- 2) http://www.oriold.uzh.ch/static/hegira.html
-- 3) http://www.islamicfinder.org