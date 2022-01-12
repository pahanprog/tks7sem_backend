import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** The javascript `Date` as string. Type represents date and time as the ISO Date string. */
  DateTime: any;
};


export type FieldError = {
  __typename?: 'FieldError';
  field: Scalars['String'];
  message: Scalars['String'];
};

export type Friends = {
  __typename?: 'Friends';
  id: Scalars['Float'];
  recipient?: Maybe<User>;
  sender?: Maybe<User>;
};

export type Mutation = {
  __typename?: 'Mutation';
  register?: Maybe<UserResponse>;
  login: UserResponse;
  logout: Scalars['Boolean'];
  changePfp: Scalars['String'];
  changeInfo: User;
  createPost?: Maybe<PostResponse>;
  editPost: PostResponse;
  deletePost: Scalars['Boolean'];
  likePost: Scalars['Int'];
  unlikePost: Scalars['Int'];
  sendFriendRequest?: Maybe<Scalars['Boolean']>;
  sendFriendResponse: Scalars['Boolean'];
};


export type MutationRegisterArgs = {
  input: UserInput;
};


export type MutationLoginArgs = {
  password: Scalars['String'];
  usernameOrEmail: Scalars['String'];
};


export type MutationChangePfpArgs = {
  pfp: Scalars['String'];
};


export type MutationChangeInfoArgs = {
  email: Scalars['String'];
  username: Scalars['String'];
};


export type MutationCreatePostArgs = {
  input: PostInput;
};


export type MutationEditPostArgs = {
  input: PostInput;
  id: Scalars['Int'];
};


export type MutationDeletePostArgs = {
  id: Scalars['Int'];
};


export type MutationLikePostArgs = {
  id: Scalars['Int'];
};


export type MutationUnlikePostArgs = {
  id: Scalars['Int'];
};


export type MutationSendFriendRequestArgs = {
  id: Scalars['Int'];
};


export type MutationSendFriendResponseArgs = {
  id: Scalars['Int'];
};

export type Post = {
  __typename?: 'Post';
  id: Scalars['Float'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  title: Scalars['String'];
  body: Scalars['String'];
  picture?: Maybe<Scalars['String']>;
  isEdited: Scalars['Boolean'];
  likeCount: Scalars['Float'];
  creator: User;
  isLiked: Scalars['Boolean'];
};

export type PostInput = {
  title: Scalars['String'];
  body: Scalars['String'];
  picture?: Maybe<Scalars['String']>;
};

export type PostResponse = {
  __typename?: 'PostResponse';
  errors?: Maybe<Array<FieldError>>;
  post?: Maybe<Post>;
};

export type Query = {
  __typename?: 'Query';
  test: Scalars['String'];
  me?: Maybe<User>;
  getPostById?: Maybe<Post>;
  getFeed: Array<Post>;
  getFriendList: Array<Friends>;
  getIncomingRequests: Array<Friends>;
  getOutgoingRequests: Array<Friends>;
  getAllUsers: Array<User>;
};


export type QueryGetPostByIdArgs = {
  id: Scalars['Int'];
};

export type User = {
  __typename?: 'User';
  id: Scalars['Float'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  username: Scalars['String'];
  email: Scalars['String'];
  profilePicture?: Maybe<Scalars['String']>;
};

export type UserInput = {
  username: Scalars['String'];
  email: Scalars['String'];
  password: Scalars['String'];
};

export type UserResponse = {
  __typename?: 'UserResponse';
  errors?: Maybe<Array<FieldError>>;
  user?: Maybe<User>;
};

export type ChangeInfoMutationVariables = Exact<{
  email: Scalars['String'];
  username: Scalars['String'];
}>;


export type ChangeInfoMutation = { __typename?: 'Mutation', changeInfo: { __typename?: 'User', id: number, username: string, email: string } };

export type CreatePostMutationVariables = Exact<{
  title: Scalars['String'];
  body: Scalars['String'];
  picture?: Maybe<Scalars['String']>;
}>;


export type CreatePostMutation = { __typename?: 'Mutation', createPost?: Maybe<{ __typename?: 'PostResponse', errors?: Maybe<Array<{ __typename?: 'FieldError', field: string, message: string }>>, post?: Maybe<{ __typename?: 'Post', id: number, createdAt: any, title: string, body: string, picture?: Maybe<string>, isEdited: boolean, likeCount: number, isLiked: boolean, creator: { __typename?: 'User', id: number, username: string, profilePicture?: Maybe<string> } }> }> };

export type LikePostMutationVariables = Exact<{
  id: Scalars['Int'];
}>;


export type LikePostMutation = { __typename?: 'Mutation', likePost: number };

export type LoginMutationVariables = Exact<{
  usernameOrEmail: Scalars['String'];
  password: Scalars['String'];
}>;


export type LoginMutation = { __typename?: 'Mutation', login: { __typename?: 'UserResponse', errors?: Maybe<Array<{ __typename?: 'FieldError', field: string, message: string }>>, user?: Maybe<{ __typename?: 'User', id: number, username: string }> } };

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = { __typename?: 'Mutation', logout: boolean };

export type ChangePfpMutationVariables = Exact<{
  pfp: Scalars['String'];
}>;


export type ChangePfpMutation = { __typename?: 'Mutation', changePfp: string };

export type RegisterMutationVariables = Exact<{
  email: Scalars['String'];
  username: Scalars['String'];
  password: Scalars['String'];
}>;


export type RegisterMutation = { __typename?: 'Mutation', register?: Maybe<{ __typename?: 'UserResponse', errors?: Maybe<Array<{ __typename?: 'FieldError', field: string, message: string }>>, user?: Maybe<{ __typename?: 'User', id: number, username: string }> }> };

export type SendFriendRequestMutationVariables = Exact<{
  id: Scalars['Int'];
}>;


export type SendFriendRequestMutation = { __typename?: 'Mutation', sendFriendRequest?: Maybe<boolean> };

export type SendFriendResponseMutationVariables = Exact<{
  id: Scalars['Int'];
}>;


export type SendFriendResponseMutation = { __typename?: 'Mutation', sendFriendResponse: boolean };

export type UnlikePostMutationVariables = Exact<{
  id: Scalars['Int'];
}>;


export type UnlikePostMutation = { __typename?: 'Mutation', unlikePost: number };

export type GetAllUsersQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllUsersQuery = { __typename?: 'Query', getAllUsers: Array<{ __typename?: 'User', id: number, username: string, profilePicture?: Maybe<string> }> };

export type GetFeedQueryVariables = Exact<{ [key: string]: never; }>;


export type GetFeedQuery = { __typename?: 'Query', getFeed: Array<{ __typename?: 'Post', id: number, createdAt: any, updatedAt: any, title: string, body: string, picture?: Maybe<string>, isEdited: boolean, likeCount: number, isLiked: boolean, creator: { __typename?: 'User', id: number, username: string, profilePicture?: Maybe<string> } }> };

export type GetFriendListQueryVariables = Exact<{ [key: string]: never; }>;


export type GetFriendListQuery = { __typename?: 'Query', getFriendList: Array<{ __typename?: 'Friends', recipient?: Maybe<{ __typename?: 'User', id: number, username: string, profilePicture?: Maybe<string> }>, sender?: Maybe<{ __typename?: 'User', id: number, username: string, profilePicture?: Maybe<string> }> }> };

export type GetIncomingRequestsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetIncomingRequestsQuery = { __typename?: 'Query', getIncomingRequests: Array<{ __typename?: 'Friends', id: number, sender?: Maybe<{ __typename?: 'User', id: number, username: string, email: string, profilePicture?: Maybe<string> }> }> };

export type GetOutgoingRequestsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetOutgoingRequestsQuery = { __typename?: 'Query', getOutgoingRequests: Array<{ __typename?: 'Friends', recipient?: Maybe<{ __typename?: 'User', id: number, username: string, profilePicture?: Maybe<string> }> }> };

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = { __typename?: 'Query', me?: Maybe<{ __typename?: 'User', id: number, username: string, email: string, profilePicture?: Maybe<string> }> };


export const ChangeInfoDocument = gql`
    mutation ChangeInfo($email: String!, $username: String!) {
  changeInfo(email: $email, username: $username) {
    id
    username
    email
  }
}
    `;

export function useChangeInfoMutation() {
  return Urql.useMutation<ChangeInfoMutation, ChangeInfoMutationVariables>(ChangeInfoDocument);
};
export const CreatePostDocument = gql`
    mutation CreatePost($title: String!, $body: String!, $picture: String) {
  createPost(input: {title: $title, body: $body, picture: $picture}) {
    errors {
      field
      message
    }
    post {
      id
      createdAt
      title
      body
      picture
      isEdited
      likeCount
      creator {
        id
        username
        profilePicture
      }
      isLiked
    }
  }
}
    `;

export function useCreatePostMutation() {
  return Urql.useMutation<CreatePostMutation, CreatePostMutationVariables>(CreatePostDocument);
};
export const LikePostDocument = gql`
    mutation LikePost($id: Int!) {
  likePost(id: $id)
}
    `;

export function useLikePostMutation() {
  return Urql.useMutation<LikePostMutation, LikePostMutationVariables>(LikePostDocument);
};
export const LoginDocument = gql`
    mutation Login($usernameOrEmail: String!, $password: String!) {
  login(usernameOrEmail: $usernameOrEmail, password: $password) {
    errors {
      field
      message
    }
    user {
      id
      username
    }
  }
}
    `;

export function useLoginMutation() {
  return Urql.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument);
};
export const LogoutDocument = gql`
    mutation Logout {
  logout
}
    `;

export function useLogoutMutation() {
  return Urql.useMutation<LogoutMutation, LogoutMutationVariables>(LogoutDocument);
};
export const ChangePfpDocument = gql`
    mutation ChangePfp($pfp: String!) {
  changePfp(pfp: $pfp)
}
    `;

export function useChangePfpMutation() {
  return Urql.useMutation<ChangePfpMutation, ChangePfpMutationVariables>(ChangePfpDocument);
};
export const RegisterDocument = gql`
    mutation Register($email: String!, $username: String!, $password: String!) {
  register(input: {email: $email, username: $username, password: $password}) {
    errors {
      field
      message
    }
    user {
      id
      username
    }
  }
}
    `;

export function useRegisterMutation() {
  return Urql.useMutation<RegisterMutation, RegisterMutationVariables>(RegisterDocument);
};
export const SendFriendRequestDocument = gql`
    mutation SendFriendRequest($id: Int!) {
  sendFriendRequest(id: $id)
}
    `;

export function useSendFriendRequestMutation() {
  return Urql.useMutation<SendFriendRequestMutation, SendFriendRequestMutationVariables>(SendFriendRequestDocument);
};
export const SendFriendResponseDocument = gql`
    mutation SendFriendResponse($id: Int!) {
  sendFriendResponse(id: $id)
}
    `;

export function useSendFriendResponseMutation() {
  return Urql.useMutation<SendFriendResponseMutation, SendFriendResponseMutationVariables>(SendFriendResponseDocument);
};
export const UnlikePostDocument = gql`
    mutation UnlikePost($id: Int!) {
  unlikePost(id: $id)
}
    `;

export function useUnlikePostMutation() {
  return Urql.useMutation<UnlikePostMutation, UnlikePostMutationVariables>(UnlikePostDocument);
};
export const GetAllUsersDocument = gql`
    query GetAllUsers {
  getAllUsers {
    id
    username
    profilePicture
  }
}
    `;

export function useGetAllUsersQuery(options: Omit<Urql.UseQueryArgs<GetAllUsersQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<GetAllUsersQuery>({ query: GetAllUsersDocument, ...options });
};
export const GetFeedDocument = gql`
    query GetFeed {
  getFeed {
    id
    createdAt
    updatedAt
    title
    body
    picture
    isEdited
    likeCount
    isLiked
    creator {
      id
      username
      profilePicture
    }
  }
}
    `;

export function useGetFeedQuery(options: Omit<Urql.UseQueryArgs<GetFeedQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<GetFeedQuery>({ query: GetFeedDocument, ...options });
};
export const GetFriendListDocument = gql`
    query GetFriendList {
  getFriendList {
    recipient {
      id
      username
      profilePicture
    }
    sender {
      id
      username
      profilePicture
    }
  }
}
    `;

export function useGetFriendListQuery(options: Omit<Urql.UseQueryArgs<GetFriendListQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<GetFriendListQuery>({ query: GetFriendListDocument, ...options });
};
export const GetIncomingRequestsDocument = gql`
    query GetIncomingRequests {
  getIncomingRequests {
    id
    sender {
      id
      username
      email
      profilePicture
    }
  }
}
    `;

export function useGetIncomingRequestsQuery(options: Omit<Urql.UseQueryArgs<GetIncomingRequestsQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<GetIncomingRequestsQuery>({ query: GetIncomingRequestsDocument, ...options });
};
export const GetOutgoingRequestsDocument = gql`
    query GetOutgoingRequests {
  getOutgoingRequests {
    recipient {
      id
      username
      profilePicture
    }
  }
}
    `;

export function useGetOutgoingRequestsQuery(options: Omit<Urql.UseQueryArgs<GetOutgoingRequestsQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<GetOutgoingRequestsQuery>({ query: GetOutgoingRequestsDocument, ...options });
};
export const MeDocument = gql`
    query Me {
  me {
    id
    username
    email
    profilePicture
  }
}
    `;

export function useMeQuery(options: Omit<Urql.UseQueryArgs<MeQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<MeQuery>({ query: MeDocument, ...options });
};