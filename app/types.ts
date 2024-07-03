// Define the structure for the filter criteria
export type FilterCriteria = {
    status?: string;
    onlyLastStatus?: boolean;
  };
  
  // Define the props for the PendingBatchesCard component
  export interface PendingBatchesCardProps {
    setFilterCriteria: (criteria: FilterCriteria) => void;
  }
  
