import { State, UserContextTypes, UserDataProp } from "@app/context/user.context";
import { setegid } from "process";
import { StateCreator, create } from "zustand";
import { createJSONStorage, devtools, persist, PersistOptions } from "zustand/middleware";


interface TokenTypes {
    tokens: {
        access: {
            token: string,
            expires: string
        },
        refresh: {
            token: string,
            expires: string
        }
    }
}
export interface UserState {
    user: UserDataProp | null;
    login: (user: UserDataProp) => void;
}

type MyPersist = (
    config: StateCreator<UserState>,
    options: PersistOptions<UserState>
) => StateCreator<UserState>;




export const useUserStore = create<UserState>((set) => ({
    user: null,
    login: (user: UserDataProp) => {
        set((state) => ({ ...state, user }))
    },
})
);

useUserStore.subscribe((state) => {
    console.log(state.user?.tokens, "state from subscribe")
})

type VarState = {
    id: string;
    var_name: string;
    type: "INPUT" | "OUTPUT" | "FIXED";
    value: number;
};

export type iSectionData = {
    id: number
    title: string
    type: string
    format: string
    tooltip: string
    appendedText: string
    formula: string
    address: string
}

type ContentTypeVideo = {
    class?: string
    dataType: "media" | "description"
    link: string
    mediaOrigin?: string
    span?: string
    text?: string
    _id:string
}

export type SectionStateAdminTool = {
    headers?: {
        title: {
            mainTitle: {
                dataType?: string,
                style?: string,
                text?: string
            },
            subTitle: {
                dataType?: string,
                text?: string
            },
            quotes: {
                dataType?: string,
                position?: string,
                elements: []
            },
            content: {
                dataType?: string,
                elements: ContentTypeVideo[]
            },
            dataType?: string,
            description?: string
        }
    },
    grayContent?: {
        dataType?: string,
        classes?: string,
        elements: iSectionData[]
    },
    address?: string,
    sectionTitle?: string,
    order?: number,
    _id?: string
}

interface SectionState {
    sections: SectionStateAdminTool[];
    template_id: string,
    version_id: string
    addSection: (section: iSectionData) => void;
    remove: (var_name: string) => void;
    // update: (sec: iSectionData, id: string) => void;
}

export const useAdminSectionStore = create<SectionState>((set) => ({
    sections: [],
    template_id: "",
    version_id: "",
    addSection: (section: iSectionData) => set((state) => ({
        //add the section inside section.grayContent.elements while retaining the old elements
    })),
    remove: (id: string) =>
        set((state) => ({
            sections: state.sections.filter((vars) => vars._id !== id),
        })),
    // update: (section: iSectionData, id: string) =>
    //     set((state) => ({
    //         sections: state.sections.map((vars) => {
    //             if (vars._id === id) {
    //                 return {
    //                     ...vars,
    //                     grayContent: { elements: section }
    //                 };
    //             } else {
    //                 return vars;
    //             }
    //         }),
    //     })),
}));
