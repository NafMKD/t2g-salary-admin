export type Salary = {
    id: number;
    name: string;
    email: string;
    salary_local: string;     
    salary_euros: string | null;
    commission: string;
    displayed_salary: string;
    created_at: string | null;
    updated_at: string | null;
  };
  
  export type Paged<T> = {
    data: T[];
    meta: {
      current_page: number;
      per_page: number;
      total: number;
      last_page: number;
    };
  };
  