fetch('https://www.tiqets.com/api/v4/products/974079/', { headers: { 'Accept': 'application/json' } })
  .then(r=>r.json())
  .then(t => console.log(JSON.stringify(t).substring(0, 500)));
