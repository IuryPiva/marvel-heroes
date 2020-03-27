import React, { useState } from "react";
import {
  List,
  Spin,
  Pagination as _Pagination,
  AutoComplete as _AutoComplete
} from "antd";
import CharacterPreview from "../../components/CharacterPreview";
import { useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import styled from "styled-components";

const CHARACTERS = gql`
  query Characters($offset: Int!, $limit: Int!, $nameStartsWith: String!) {
    characters(
      offset: $offset
      limit: $limit
      nameStartsWith: $nameStartsWith
    ) {
      offset
      limit
      total
      count
      results {
        id
        name
        resourceURI
        thumbnail {
          path
          extension
        }
        description
        series {
          items {
            name
            resourceURI
          }
        }
      }
    }
  }
`;

const AutoComplete = styled(_AutoComplete)`
  width: 300px;
  align-self: center;
  margin-bottom: 16px;
  justify-self: center;
`;
const Pagination = styled(_Pagination)`
  align-self: center;
  justify-self: center;
`;

export default () => {
  const [pageSize, setPageSize] = useState(12);
  const [currentPage, setCurrentPage] = useState(1);

  const { loading, error, data, fetchMore } = useQuery(CHARACTERS, {
    variables: {
      offset: 0,
      limit: pageSize,
      nameStartsWith: ""
    },
    fetchPolicy: "cache-first"
  });

  const onShowSizeChange = (newCurrentPage, newPageSize) => {
    setPageSize(newPageSize);
    setCurrentPage(newCurrentPage);
    fetchMore({
      variables: {
        offset: newPageSize * (newCurrentPage - 1),
        limit: newPageSize,
        nameStartsWith: ""
      },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult) return prev;
        return fetchMoreResult;
      }
    });
  };

  let timeout;

  const onSearch = value => {
    clearTimeout(timeout);

    timeout = setTimeout(() => {
      fetchMore({
        variables: {
          offset: pageSize * (currentPage - 1),
          limit: pageSize,
          nameStartsWith: value
        },
        updateQuery: (prev, { fetchMoreResult }) => {
          if (!fetchMoreResult) return prev;
          return fetchMoreResult;
        }
      });
    }, 300);
  };

  if (loading) return <Spin />;
  if (error) return <p>Error :(</p>;

  data.characters.results.map(char => (char.value = char.name));
  return (
    <>
      <AutoComplete
        onChange={onSearch}
        onSearch={onSearch}
        options={data.characters.results}
        placeholder="Search here"
        filterOption={(inputValue, option) =>
          option.name.toUpperCase().startsWith(inputValue.toUpperCase())
        }
      />
      <List
        grid={{
          gutter: 16,
          xs: 1,
          sm: 2,
          md: 4,
          lg: 4,
          xl: 6,
          xxl: 3
        }}
        dataSource={data.characters.results}
        renderItem={item => (
          <List.Item>
            <CharacterPreview
              thumbnail={item.thumbnail}
              name={item.name}
              description={item.description}
              id={item.id}
            />
          </List.Item>
        )}
      />
      <Pagination
        onChange={onShowSizeChange}
        showSizeChanger
        onShowSizeChange={onShowSizeChange}
        defaultCurrent={1}
        defaultPageSize={pageSize}
        total={data.characters.total}
        pageSizeOptions={["12", "24", "36", "48"]}
      />
    </>
  );
};
