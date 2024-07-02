
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase
        



// import { useState, useEffect } from 'react'
// import { supabase } from '../utils/supabase'

// function Page() {
//   const [todos, setTodos] = useState([])

//   useEffect(() => {
//     function getTodos() {
//       const { data: todos } = await supabase.from('todos').select()

//       if (todos.length > 1) {
//         setTodos(todos)
//       }
//     }

//     getTodos()
//   }, [])

//   return (
//     <div>
//       {todos.map((todo) => (
//         <li key={todo}>{todo}</li>
//       ))}
//     </div>
//   )
// }
// export default Page
