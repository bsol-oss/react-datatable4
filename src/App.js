import React, { useState } from 'react';
import axios from 'axios';
import {
  Avatar,
  Badge,
  Box,
  HStack,
  IconButton,
  Text,
  Center,
  Checkbox,
} from '@chakra-ui/react';
import { FiEdit2, FiTrash2 } from 'react-icons/fi';

import DataTable from './components/DataTable';
import Table from './components/Table';
import Header from './components/Header';
import TableTitle from './components/functionalcomponents/TableTitle';
import GlobalSearch from './components/functionalcomponents/GlobalSearch';
import Footer from './components/Footer';
import Pagination from './components/footercomponents/Pagination';
import SelectedNumber from './components/footercomponents/SelectedNumber';
import PageSizeControl from './components/footercomponents/PageSizeControl';
import TableHeader from './components/bodycomponents/TableHeader';
import TableBody from './components/bodycomponents/TableBody';

import ColumnSearch from './components/bodycomponents/ColumnSearch';
import DropdownFilter from './components/bodycomponents/DropdownFilter';

const App = ({
  height = '400px',
  tableTitle = 'Member',
  columns = [],
  arrowIcons = [],
  isColumnResizable = false,
  paginationComponent = null,
  globalSearchComponent = null,
  loadingComponent = null,
  errorComponent = null,
  apiUrl = 'http://localhost:8081/api/g/subaream/all',
  pageSizes = [5, 10, 15, 20, 25, 30],
  extraSortFilters = [], // [{ id: 'hub_id', desc: true }]
  extraFieldFilters = {}, // { is_active: 1 }
  axiosRef = axios,
}) => {
  const [isAllChecked, setAllChecked] = useState(false);
  const [selectedIds, setSelectedIds] = useState<Array<number>>([]);
  const [allIds, setIds] = useState<Array<number>>([131, 133, 143, 144, 145]);
  const [id, setId] = useState<string | number>('');

  // Toggle "All" checkbox
  const toggleAllChecked = () => {
    setAllChecked((pre) => {
      if (pre) {
        setSelectedIds([]);
      } else {
        setSelectedIds(allIds);
      }

      return !pre;
    });
  };

  // Toggle row checkboxes
  const onCheckboxChange = (e, id) => {
    if (e.target.checked) {
      setSelectedIds((pre) => {
        const newSelectedIds = [...pre, id];
        checkIfAllChecked(newSelectedIds);
        return newSelectedIds;
      });
    } else {
      setSelectedIds((pre) => {
        const newSelectedIds = pre.filter((itemId) => itemId !== id);
        checkIfAllChecked(newSelectedIds);
        return newSelectedIds;
      });
    }
  };

  const onSingleCheckboxChange = (e, id) => {
    if (e.target.checked) setId(id);
    else setId('')
  };

  const checkIfAllChecked = (ids) => {
    setAllChecked(allIds.length === ids.length);
  };

  return (
    <Box>
      <DataTable>
        <Header>
          {tableTitle ? <TableTitle>{tableTitle}</TableTitle> : null}
          {globalSearchComponent ? globalSearchComponent : <GlobalSearch />}
        </Header>
        <Table
          columns={[
            {
              header: () => {
                return (
                  <Center>
                    <Checkbox
                      isChecked={isAllChecked}
                      onChange={toggleAllChecked}
                    />
                  </Center>
                );
              },
              id: 'select',
              accessorKey: '',
              size: 1,
              cell: ({ row }) => (
                <Center>
                  <Checkbox
                    isChecked={selectedIds.includes(row.original.id)}
                    onChange={(e) => onCheckboxChange(e, row.original.id)}
                  />
                </Center>
              ),
            },
            {
              header: '',
              id: 'select',
              accessorKey: '',
              size: 1,
              cell: ({ row }) => (
                <Center>
                  <Checkbox
                    isChecked={id === row.original.id}
                    onChange={(e) => onSingleCheckboxChange(e, row.original.id)}
                  />
                </Center>
              ),
            },
            {
              header: 'Name',
              accessorKey: 'name',
              id: 'name',
              cell: ({ row }) => (
                <HStack spacing="3">
                  <Avatar name={row.original.name} boxSize="10" />
                  <Box>
                    <Text fontWeight="medium">{row.original.name}</Text>
                  </Box>
                </HStack>
              ),
              size: 200,
              Filter: ColumnSearch,
            },
            {
              header: 'Status',
              accessorKey: 'is_active',
              id: 'is_active',
              cell: ({ row }) => (
                <Badge
                  size="sm"
                  colorScheme={row.original.is_active === 1 ? 'green' : 'red'}
                >
                  {row.original.is_active === 1 ? 'Active' : 'Inactive'}
                </Badge>
              ),
              size: 200,
              Filter: DropdownFilter,
            },
            {
              header: 'Description',
              accessorKey: 'description',
              id: 'description',
              cell: ({ row }) => (
                <Text color="fg.muted">
                  {row.original.description === null
                    ? ''
                    : row.original.description}
                </Text>
              ),
              Filter: ColumnSearch,
              size: 200,
            },
            {
              header: 'Hub ID',
              accessorKey: 'hub_id',
              id: 'hub_id',
              cell: ({ row }) => (
                <Text color="fg.muted">{row.original.hub_id}</Text>
              ),
              size: 200,
              Filter: DropdownFilter,
            },
            {
              header: 'BU ID',
              accessorKey: 'bu_id',
              id: 'bu_id',
              cell: ({ row }) => (
                <Text color="fg.muted">{row.original.bu_id}</Text>
              ),
              size: 400,
              Filter: ColumnSearch,
            },
            {
              header: '',
              accessorKey: 'actions',
              id: 'actions',
              cell: () => (
                <HStack spacing="1">
                  <IconButton
                    icon={<FiTrash2 fontSize="1.25rem" />}
                    variant="tertiary"
                    aria-label="Delete Column"
                  />
                  <IconButton
                    icon={<FiEdit2 fontSize="1.25rem" />}
                    variant="tertiary"
                    aria-label="Edit Column"
                  />
                </HStack>
              ),
              size: 200,
            },
          ]}
          apiUrl={apiUrl}
          extraSortFilters={extraSortFilters}
          extraFieldFilters={extraFieldFilters}
          LoadingComponent={loadingComponent}
          ErrorComponent={errorComponent}
          axios={axiosRef}
        >
          <TableHeader
            // arrowIcons={arrowIcons}
            // isColumnResizable={isColumnResizable}
          />
          <TableBody height={height} />
        </Table>
        {paginationComponent ? (
          paginationComponent
        ) : (
          <Footer>
            <Pagination>
              <SelectedNumber />
              <PageSizeControl pages={pageSizes} />
            </Pagination>
          </Footer>
        )}
      </DataTable>
    </Box>
  );
};

export default App;
