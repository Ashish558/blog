


export const checkIfReachedBottom = (ref, cb) => {
  
   if (ref.current) {
      const { scrollTop, scrollHeight, clientHeight } = ref.current;
      if (scrollTop + clientHeight === scrollHeight) {
         cb()
      }
   }
}


