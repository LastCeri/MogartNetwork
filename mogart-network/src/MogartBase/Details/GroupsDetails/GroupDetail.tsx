import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import Header from '../../../MogartBase/ThemeParts/MainPart/Header/HeaderPart';
import Navbar from '../../../MogartBase/ThemeParts/MainPart/Navbar/Navbar';
import { API_URL } from '../../Api/Api';
import { useData } from '../../../MogartBase/Context/DataContext';
import {GroupMembers} from './components/GroupMembers/GroupMembers';
import GroupDiscussions from './components/GroupDiscussions/GroupDiscussions';

interface GroupMemberRaw {
  MemberID: string;
  MemberName: string;
  MemberImage: string;
}

interface GroupDiscussionRaw {
  id: string;
  DiscussionsTitle: string;
  DiscussionsMember: [];
  DiscussionsChat: [];
  DiscussionsDate: string;
  DiscussionsStatus : string;
  DiscussionsTags:  [];
  DiscussionsCategory: string;
  DiscussionsAuthor: string;
  DiscussionsAuthorImage : string;
}

export interface GroupMember {
  id: string;
  name: string;
  image: string;
}

export interface GroupDiscussion {
  id: string;
  DiscussionsTitle: string;
  DiscussionsMember: [];
  DiscussionsChat: [];
  DiscussionsDate: string;
  DiscussionsStatus : string;
  DiscussionsTags:  [];
  DiscussionsCategory: string;
  DiscussionsAuthor: string;
  DiscussionsAuthorImage : string;
}

interface GroupDetailItem {
  id: string;
  GroupsName: string;
  GroupsDesc: string;
  GroupsImage: string;
  GroupsMembers: GroupMember[];
  GroupDiscussions: GroupDiscussion[];
  DiscussionsCode: string;
}

const GroupDetail: React.FC = () => {
  const { groupname } = useParams<{ groupname: string }>();
  const [groupDetail, setGroupDetail] = useState<GroupDetailItem | null>(null);
  const { isLoading,siteData } = useData();
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoading || !groupname) return;
    if(siteData.SiteStatus != "1") navigate('/');

    const fetchGroupDetail = async () => {
      try {
        
        const response = await axios.get(`${API_URL}/GetGroupDetail/${groupname}`);

        if (response.status === 200 && response.data) {
          const data = response.data;
    
          const parsedMembers = JSON.parse(data.GroupsMembers || '[]');
          const GroupsMembers: GroupMember[] = parsedMembers.map((member: GroupMemberRaw) => ({
            id: member.MemberID,
            name: member.MemberName,
            image: member.MemberImage,
          }));
        
          let GroupDiscussions: GroupDiscussion[] = [];
          if (data.Discussions) {
            const discussionsParsed = JSON.parse(data.Discussions);
            GroupDiscussions = [{
              id: discussionsParsed.DiscussionsCode || '',
              DiscussionsTitle: discussionsParsed.DiscussionsTitle || '',
              DiscussionsMember: discussionsParsed.DiscussionsMember || [],
              DiscussionsChat: discussionsParsed.DiscussionsChat || [],
              DiscussionsDate: discussionsParsed.DiscussionsDate || '',
              DiscussionsStatus: discussionsParsed.DiscussionsStatus || '',
              DiscussionsTags: discussionsParsed.DiscussionsTags || [],
              DiscussionsCategory: discussionsParsed.DiscussionsCategory || '',
              DiscussionsAuthor: discussionsParsed.DiscussionsAuthor || '',
              DiscussionsAuthorImage: discussionsParsed.DiscussionsAuthorImage || '',
            }];
          }
          
          const formattedGroupDetail: GroupDetailItem = {
            id: data.DiscussionsCode || '',
            GroupsName: data.GroupsName,
            GroupsDesc: data.GroupsDesc,
            GroupsImage: data.GroupsImage || '',
            GroupsMembers,
            DiscussionsCode: data.DiscussionsCode || '',
            GroupDiscussions,
          };
        
          setGroupDetail(formattedGroupDetail);
        } else {
          console.error('Error fetching group detail: Invalid response data');
        }
      } catch (error) {
        console.error('Error fetching group detail:', error);
      }
    };

    if(groupname){
      fetchGroupDetail();
    }
  }, [groupname, isLoading]);

  if (isLoading || !groupDetail) {
    return  (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-purple-500"></div>
        <p className="text-lg text-purple-600 font-semibold ml-4">Loading...</p>
      </div>
    );;
  }

  return (
    <>
      <Header />
      <Navbar />
      <div className="container mx-auto mt-20 flex justify-center items-center">
        <div className="bg-white shadow-lg rounded-lg overflow-hidden w-full max-w-4xl">
          <div className="bg-cover bg-center h-56 p-4" style={{ backgroundImage: `url(${groupDetail.GroupsImage})` }}>
            <div className="flex justify-end">
              <span className="text-white bg-red-500 rounded-full text-sm font-semibold mr-2 px-2.5 py-0.5">
                {groupDetail.GroupsMembers.length} Members
              </span>
            </div>
          </div>
          <div className="p-4">
            <h3 className="text-2xl font-bold">{groupDetail.GroupsName}</h3>
            <p className="mt-2 text-gray-600">{groupDetail.GroupsDesc}</p>
          </div>
          <div className="p-4 border-t border-gray-200">
            <GroupMembers members={groupDetail.GroupsMembers} />
          </div>
          <div className="p-4 border-t border-gray-200">
            <GroupDiscussions discussions={groupDetail.GroupDiscussions} />
          </div>
        </div>
      </div>
    </>
  );  
};

export default GroupDetail;
