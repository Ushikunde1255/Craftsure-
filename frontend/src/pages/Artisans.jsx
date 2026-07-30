
useEffect(() => {
  const tryFetch = async () => {
    try{
      let list=[];
      const urls=['https://craftsure-1.onrender.com/api/artisans','https://craftsure-1.onrender.com/api/users','https://craftsure-1.onrender.com/api/auth/users'];
      for(let u of urls){
        try{
          const r=await fetch(u).then(r=>r.json());
          const arr=Array.isArray(r)?r:r.artisans||r.users||[];
          if(arr.length>0){ list=arr; break; }
        }catch{}
      }
      // Fallback mock so you see UI working
      if(list.length===0){
        list=[
          {_id:'1', name:'James Ugee', skill:'Carpentry', location:'Makurdi', phone:'07066401403'},
          {_id:'2', name:'Ushi Nicholas', skill:'Roofing', location:'Accra Ghana'},
          {_id:'3', name:'John Carp', skill:'General Artisan', location:'Abia'}
        ];
      }
      setArtisans(list);
    }catch{ setArtisans([]); }
  };
  tryFetch();
}, []);
