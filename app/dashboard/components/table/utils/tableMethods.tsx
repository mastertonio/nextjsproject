import { iDashRowProp2 } from "@dashboard/components/Row";
import { keys } from "@mantine/utils";
import { Interface } from "readline";

interface RowData {
  name: string;
  email: string;
  company: string;
}

export const filterMultipleData = (data: iDashRowProp2[], search: string[]) => {
  const query = search;
  return data.filter((item) =>
    query.length > 0
      ? query.includes(item.source_name)
      : item.source_name.toLowerCase().includes("")
  );
};

export const sortFilterData = (
  data: iDashRowProp2[],
  payload: {
    sortBy: keyof iDashRowProp2 | null;
    reversed: boolean;
    search: any;
  }
) => {
  const { sortBy } = payload;

  if (!sortBy) {
    return filterMultipleData(data, payload.search);
  }

  return filterMultipleData(
    [...data].sort((a, b) => {
      if (payload.reversed) {
        return b[sortBy].toString().localeCompare(a[sortBy]);
      }

      return a[sortBy].toString().localeCompare(b[sortBy]);
    }),
    payload.search
  );
};

///////////////default
export const filterData = (data: iDashRowProp2[], search: string) => {
  const query = search.toLowerCase().trim();
  return data.filter((item) => {
    return item.name.toLowerCase().includes(query);
  });
};

export const sortData = (
  data: iDashRowProp2[],
  payload: {
    sortBy: keyof iDashRowProp2 | null;
    reversed: boolean;
    search: any;
  }
) => {
  const { sortBy } = payload;

  if (!sortBy) {
    return filterData(data, payload.search);
  }

  return filterData(
    [...data].sort((a, b) => {
      if (payload.reversed) {
        return b[sortBy].toString().localeCompare(a[sortBy]);
      }

      return a[sortBy].toString().localeCompare(b[sortBy]);
    }),
    payload.search
  );
};

//////////////////////////Company
export interface ICompanyProps {
  _id: string;
  name: string;
  alias: string;
  licenses: string;
  contact_fname: string;
  contact_lname: string;
  contact_email: string;
  contact_phone: string;
  templates: string;
  default_active_value: string;
  active: string;
}

export const filterCompanyData = (data: ICompanyProps[], search: string) => {
  const query = search.toLowerCase().trim();
  return data.filter((item) => {
    return item.name.toLowerCase().includes(query);
  });
};

export const sortCompanyData = (
  data: ICompanyProps[],
  payload: {
    sortBy: keyof ICompanyProps | null;
    reversed: boolean;
    search: any;
  }
) => {
  const { sortBy } = payload;

  if (!sortBy) {
    return filterCompanyData(data, payload.search);
  }

  return filterCompanyData(
    [...data].sort((a, b) => {
      if (a === b) {
        return 0;
      }

      if (a === null || a[sortBy] == undefined) {
        return 1;
      }

      if (b === null || b[sortBy] == undefined) {
        return -1;
      }

      if (payload.reversed) {
        return b[sortBy].toString().localeCompare(a[sortBy]);
      }

      return a[sortBy].toString().localeCompare(b[sortBy]);
    }),
    payload.search
  );
};

// /Company Users
export interface ICompanyUsersProps {
  _id: string;
  first_name: string;
  last_name: string;
  email: string;
  role: string;
  manager_email: string;
  manager_id: string;
  currency: string;
  status: string;
  created_rois: string;
}

export const filterCompanyUsersData = (
  data: ICompanyUsersProps[],
  search: string
) => {
  const query = search.toLowerCase().trim();
  return data.filter((item) => {
    return item.email.toLowerCase().includes(query);
  });
};

export const sortCompanyUsersData = (
  data: ICompanyUsersProps[],
  payload: {
    sortBy: keyof ICompanyUsersProps | null;
    reversed: boolean;
    search: any;
  }
) => {
  const { sortBy } = payload;

  if (!sortBy) {
    return filterCompanyUsersData(data, payload.search);
  }

  return filterCompanyUsersData(
    [...data].sort((a, b) => {
      if (a === b) {
        return 0;
      }

      if (a === null || a[sortBy] == undefined) {
        return 1;
      }

      if (b === null || b[sortBy] == undefined) {
        return -1;
      }

      if (payload.reversed) {
        return b[sortBy].toString().localeCompare(a[sortBy]);
      }

      return a[sortBy].toString().localeCompare(b[sortBy]);
    }),
    payload.search
  );
};

//////////////////////////Company Users with Template
export interface ICompanyTemplateUsersProps {
  user_id: string;
  template_id: string;
  template_name: string;
  calculator_name: string;
  username: string;
  link: string;
  createdAt: string;
  visits: string;
  unique_ip: string;
}

export const filterCompanyTemplateUsersData = (
  data: ICompanyTemplateUsersProps[],
  search: string
) => {
  const query = search.toLowerCase().trim();
  return data.filter((item) => {
    return (
      item.calculator_name.toLowerCase().includes(query) ||
      item.username.toLowerCase().includes(query)
    );
  });
};

export const sortCompanyTemplateUsersData = (
  data: ICompanyTemplateUsersProps[],
  payload: {
    sortBy: keyof ICompanyTemplateUsersProps | null;
    reversed: boolean;
    search: any;
  }
) => {
  const { sortBy } = payload;

  if (!sortBy) {
    return filterCompanyTemplateUsersData(data, payload.search);
  }

  return filterCompanyTemplateUsersData(
    [...data].sort((a, b) => {
      if (a === b) {
        return 0;
      }

      if (a === null || a[sortBy] == undefined) {
        return 1;
      }

      if (b === null || b[sortBy] == undefined) {
        return -1;
      }

      if (payload.reversed) {
        return b[sortBy].toString().localeCompare(a[sortBy]);
      }

      return a[sortBy].toString().localeCompare(b[sortBy]);
    }),
    payload.search
  );
};

//////////////////////////Company Templates
export interface ICompanyTemplatesProps {
  _id: string;
  name: string;
  notes: string;
  company_id: string;
  active: string;
  status: string;
}

export interface ITemplatesProps {
  _id: string;
  name: string;
  notes: string;
  company_id: string;
  active: string;
  status: string;
  version_id: string;
}

export const filterCompanyTemplatesData = (
  data: ICompanyTemplatesProps[],
  search: string
) => {
  const query = search.toLowerCase().trim();
  return data.filter((item) => {
    return (
      item.name.toLowerCase().includes(query) ||
      item.notes.toLowerCase().includes(query)
    );
  });
};

export const sortCompanyTemplatesData = (
  data: ICompanyTemplatesProps[],
  payload: {
    sortBy: keyof ICompanyTemplatesProps | null;
    reversed: boolean;
    search: any;
  }
) => {
  const { sortBy } = payload;

  if (!sortBy) {
    return filterCompanyTemplatesData(data, payload.search);
  }

  return filterCompanyTemplatesData(
    [...data].sort((a, b) => {
      if (a === b) {
        return 0;
      }

      if (a === null || a[sortBy] == undefined) {
        return 1;
      }

      if (b === null || b[sortBy] == undefined) {
        return -1;
      }

      if (payload.reversed) {
        return b[sortBy].toString().localeCompare(a[sortBy]);
      }

      return a[sortBy].toString().localeCompare(b[sortBy]);
    }),
    payload.search
  );
};

//////////////////////////Company Templates Versions
export interface ICompanyTemplatesVersionsProps {
  _id: string;
  stage: string;
  level: string;
  versions: string;
  name: string;
  notes: string;
  template_id: string;
  status: string;
}

export const filterCompanyTemplatesVersionData = (
  data: ICompanyTemplatesVersionsProps[],
  search: string
) => {
  const query = search.toLowerCase().trim();
  return data.filter((item) => {
    return (
      item.name.toLowerCase().includes(query) ||
      item.notes.toLowerCase().includes(query)
    );
  });
};

export const sortCompanyTemplatesVersionData = (
  data: ICompanyTemplatesVersionsProps[],
  payload: {
    sortBy: keyof ICompanyTemplatesVersionsProps | null;
    reversed: boolean;
    search: any;
  }
) => {
  const { sortBy } = payload;

  if (!sortBy) {
    return filterCompanyTemplatesVersionData(data, payload.search);
  }

  return filterCompanyTemplatesVersionData(
    [...data].sort((a, b) => {
      if (a === b) {
        return 0;
      }

      if (a === null || a[sortBy] == undefined) {
        return 1;
      }

      if (b === null || b[sortBy] == undefined) {
        return -1;
      }

      if (payload.reversed) {
        return b[sortBy].toString().localeCompare(a[sortBy]);
      }

      return a[sortBy].toString().localeCompare(b[sortBy]);
    }),
    payload.search
  );
};
