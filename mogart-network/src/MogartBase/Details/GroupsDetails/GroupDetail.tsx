import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Header from '../../../MogartBase/ThemeParts/MainPart/Header/HeaderPart';
import Navbar from '../../../MogartBase/ThemeParts/MainPart/Navbar/Navbar';
import { API_URL } from '../../Api/Api';
import { useData } from '../../../MogartBase/Context/DataContext';
import {GroupMembers} from './components/GroupMembers/GroupMembers';
import GroupDiscussions from './components/GroupDiscussions/GroupDiscussions';

export interface GroupMember {
  id: string;
  name: string;
}

export interface GroupDiscussion {
  id: string;
  content: string;
}

interface GroupDetailItem {
  id: string;
  GroupsName: string;
  GroupsDesc: string;
  GroupsImage: string;
  GroupsMembers: GroupMember[];
  GroupDiscussions: GroupDiscussion[];
}

const GroupDetail: React.FC = () => {
  const { groupname } = useParams<{ groupname: string }>();
  const [groupDetail, setGroupDetail] = useState<GroupDetailItem | null>(null);
  const { isLoading } = useData();

  useEffect(() => {
    if (isLoading || !groupname) {
      return;
    }

    const fetchGroupDetail = async () => {
        try {
          const response = await axios.get(`${API_URL}/GetGroupDetail/${groupname}`);
          if (response.data) {
            const formattedGroupDetail: GroupDetailItem = {
              id: response.data.GroupID,
              GroupsName: response.data.GroupsName,
              GroupsDesc: response.data.GroupDescription,
              GroupsImage: response.data.GroupsImage,
              GroupsMembers: response.data.GroupMembers?.map((member: any) => ({
                  id: member.id,
                  name: member.name,
                })) || [],
              GroupDiscussions: response.data.GroupDiscussions?.map((discussion: any) => ({
                  id: discussion.id,
                  content: discussion.content,
                })) || []
            };
      
            setGroupDetail(formattedGroupDetail);
          } else {
            console.error('Error fetching group detail: Invalid response data');
          }
        } catch (error) {
          console.error('Error fetching group detail:', error);
        }
      };
      

    fetchGroupDetail();
  }, [groupname, isLoading]);

  if (isLoading || !groupDetail) {
    return <div>Loading...</div>;
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
