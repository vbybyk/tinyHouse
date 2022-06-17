import { Select } from "antd";
import { ListingsFilter } from "../../../../lib/graphql/globalTypes";

const { Option } = Select;

interface Props {
  filter: ListingsFilter,
  setFilter: (filter: ListingsFilter) => void
}

export const ListingsFilters = ({filter, setFilter} : Props) => {
  return(
    <div className="listings-filters">
      <span>Filter by</span>
      <Select defaultValue={filter} onChange={(value: ListingsFilter) => setFilter(value)}>
        <Option value={ListingsFilter.PRICE_HIGH_TO_LOW}>Price: High to Low</Option>
        <Option value={ListingsFilter.PRICE_LOW_TO_HIGH}>Price: Low to High</Option>
      </Select>
    </div>
  )
}