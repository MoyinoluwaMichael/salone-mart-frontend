import { createContext, useContext, useState } from "react";

export const ThemeProviderContext = createContext<{name: string, setName: (theme: Theme)=> void} | undefined>(undefined);
type Theme = string;
const BasicContext = ({children}:{children : React.ReactNode}) => {
    const [name, setName] = useState<Theme>('Olami');
  return (
     <ThemeProviderContext.Provider value={{name, setName}}>
        {children}
     </ThemeProviderContext.Provider>
  )
}

export default BasicContext;

export const UseContext = ()=>{
    const content = useContext(ThemeProviderContext);
    console.log(content)
    if (content === undefined)
        throw new Error('useTheme must be used within a ThemeProvider');
    
      return content;
}