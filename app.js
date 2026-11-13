let chart;const select=document.querySelector('#segment'),fmt=n=>new Intl.NumberFormat('en').format(n);
function selected(){return DEMO_DATA.filter(x=>select.value==='all'||x.segment===select.value)}
function update(){const data=selected(),sums={Office:0,Warehouse:0,Retail:0};for(const x of data)sums[x.segment]+=x.price;
 document.querySelector('#count').textContent=data.length;document.querySelector('#volume').textContent=fmt(data.reduce((s,x)=>s+x.price,0))+' ₽';document.querySelector('#area').textContent=fmt(data.reduce((s,x)=>s+x.area,0))+' m²';
 document.querySelector('#summary').textContent=Object.entries(sums).map(([k,v])=>k+': '+fmt(v)+' RUB').join(' / ');
 const body=document.querySelector('#rows');body.replaceChildren();for(const x of data){const tr=document.createElement('tr');for(const v of [x.asset,x.segment,fmt(x.price),fmt(x.area),x.id]){const td=document.createElement('td');td.textContent=v;tr.append(td)}body.append(tr)}
 if(typeof Chart==='undefined'){
 document.querySelector('#chart').style.display='none';const box=document.querySelector('#chart-message');box.replaceChildren();
 const max=Math.max(...Object.values(sums),1);
 for(const[label,value]of Object.entries(sums)){const row=document.createElement('div'),caption=document.createElement('div'),bar=document.createElement('div');caption.textContent=label+' / '+fmt(value)+' RUB';bar.style.cssText='height:20px;background:#b53a51;border-radius:4px;margin:8px 0 20px;width:'+Math.max(1,value/max*100)+'%';row.append(caption,bar);box.append(row)}
 return}

 Chart.defaults.color='#c4b8bd';if(chart)chart.destroy();chart=new Chart(document.querySelector('#chart'),{type:'bar',data:{labels:Object.keys(sums),datasets:[{label:'Fictional transaction value (RUB)',data:Object.values(sums),backgroundColor:['#b53a51','#793143','#dac8cf'],borderRadius:5}]},options:{responsive:true,maintainAspectRatio:false,plugins:{legend:{display:false}},scales:{y:{beginAtZero:true}}}})
}
select.addEventListener('change',update);document.querySelector('#download').addEventListener('click',()=>{const escape=x=>'"'+String(x).replaceAll('"','""')+'"';const csv=[['asset','segment','price_rub','area_sqm','fixture_id'],...selected().map(x=>[x.asset,x.segment,x.price,x.area,x.id])].map(r=>r.map(escape).join(',')).join('\n');const u=URL.createObjectURL(new Blob([csv],{type:'text/csv;charset=utf-8'})),a=document.createElement('a');a.href=u;a.download='synthetic-deals.csv';a.click();URL.revokeObjectURL(u)});update();
