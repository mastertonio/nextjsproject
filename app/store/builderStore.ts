import create from "zustand";
import { devtools, persist} from "zustand/middleware"

export const useTitleStore = create((set) => ({
  title: "",

}));

//   value={titleValue}
//               onChange={setTitle}
//               // onBlur={() => setDescChange(false)}
type HeaderState = {
    value: boolean
    open: () => void
    close: () => void
  }

export const useHeaderStore = create<HeaderState>((set) => ({
    value: false,
    open: ()=> set(()=> ({ value: true})),
    close: ()=> set(()=> ({ value: false}))
}));
