// @flow
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import communityInfoFragment from '../../fragments/community/communityInfo';
import type { CommunityInfoType } from '../../fragments/community/communityInfo';
import communityMetaDataFragment from '../../fragments/community/communityMetaData';
import type { CommunityMetaDataType } from '../../fragments/community/communityMetaData';

type RP = {
  plan: string,
  amount: number,
  createdAt: Date,
  status: string,
};

export type GetCommunityRecurringPaymentsType = {
  ...$Exact<CommunityInfoType>,
  ...$Exact<CommunityMetaDataType>,
  recurringPayments: Array<?RP>,
};

export const getCommunityRecurringPaymentsQuery = gql`
  query getCommunityRecurringPayments($id: ID!) {
    community(id: $id) {
      ...communityInfo
      ...communityMetaData
      recurringPayments {
        plan
        amount
        createdAt
        status
      }
    }
  }
  ${communityMetaDataFragment}
  ${communityInfoFragment}
`;

const getCommunityRecurringPaymentsOptions = {
  options: ({ id }: { id: string }) => ({
    variables: {
      id,
    },
  }),
};

export default graphql(
  getCommunityRecurringPaymentsQuery,
  getCommunityRecurringPaymentsOptions
);
