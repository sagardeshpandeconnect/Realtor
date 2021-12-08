import { useState, useEffect } from "react";
import { useRouter } from "next/dist/client/router";
import { MdCancel } from "react-icons/md";
import Image from "next/dist/client/image";
import { Box, Flex } from "@chakra-ui/layout";
import { filterData, getFilterValues } from "../utils/filterData";
import { filter } from "@chakra-ui/styled-system";
import { Select } from "@chakra-ui/select";

const SearchFilters = () => {
  const [filters, setFilters] = useState(filterData);
  const router = useRouter();

  const searchProperties = (filterValues) => {
    const path = router.pathname;
    const { query } = router;
    const values = getFilterValues(filterValues);
    values.forEach((item) => {
      if (item.value && filterValues?.[item.name]) {
        query[item.name] = item.value;
      }
    });
    router.push({ pathname: path, query });
  };
  return (
    <Flex justifyContent="center" bg="gray.100" flexWrap="wrap">
      {filters?.map((filter) => (
        <Box key={filter.queryName}>
          <Select
            placeholder={filter.placeholder}
            w="fit-content"
            p="2"
            onChange={(event) =>
              searchProperties({ [filter.queryName]: event.target.value })
            }
          >
            {filter?.items?.map((item) => (
              <option value={item.value} key={item.value}>
                {item.name}
              </option>
            ))}
          </Select>
        </Box>
      ))}
    </Flex>
  );
};

export default SearchFilters;
