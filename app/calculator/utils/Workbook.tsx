import { useState } from "react";
import Sheet from "./Sheet";
import { Parser } from "./Parser/Parser";
import createParser from "./Parser/ParserFactory";
import { SharedContext } from "./Parser/SharedContext";
import * as utility from './Utility/Utility';
import EventDispatcher from "./Utility/EventDispatcher";
import { NameManager } from "./Workbook/NameManager";
import { Config } from "./Workbook/Config";
import Comparator from "./Utility/Comparator";

interface SheetRecord {
    [key: string]: Sheet;
}

interface Props {
    config: Config;
}

const Workbook: React.FC<Props> = ({ config }) => {
    const [sheets, setSheets] = useState<SheetRecord>({});
    const [parser, setParser] = useState<Parser>(createParser({
        sheets: {},
        utility: utility,
        comparator: null,
    } as SharedContext));
    const [dispatcher, setDispatcher] = useState<EventDispatcher>(new EventDispatcher());
    const [nameManager, setNameManager] = useState<NameManager>(new NameManager());

    nameManager.setContext(this);

    const createSheet = (name: string, element?: HTMLElement): Sheet => {
        if (!name) {
            throw new Error('Sheet should have a name');
        }

        if (sheets[name]) {
            throw new Error(`Sheet with the name "${name}" is already exists`);
        }

        const sheet = new Sheet(this, name);

        if (element) {
            sheet.element = element;
        }

        setSheets(prevSheets => ({ ...prevSheets, [name]: sheet }));
        setParser(prevParser => ({ ...prevParser, yy: { sheets: { ...prevParser.yy.sheets, [name]: sheet } } }));

        return sheet;
    };

    const getSheets = (): SheetRecord => {
        return sheets;
    };

    const getSheet = (name: string): Sheet => {
        if (name in sheets) {
            return sheets[name];
        }

        throw Error(`Sheet not found with name ${name}`);
    };

    const createFromElement = (element: HTMLElement, config?: Config): Workbook => {
        const workbook = new Workbook(parser, nameManager, dispatcher);
        /** TODO : traverse element and read the configuration and configure the workbook */

        return workbook;
    };

    const sharedContext = {
        sheets: {},
        utility: utility,
        comparator: Comparator,
    } as SharedContext;

    const createFromConfig = (config: Config): Workbook => {
        const workbook = new Workbook(parser, nameManager, dispatcher);

        sharedContext.workbook = workbook;
        /** TODO : read the configuration and configure the workbook */

        return workbook;
    };

    return null;
};

export default Workbook;
