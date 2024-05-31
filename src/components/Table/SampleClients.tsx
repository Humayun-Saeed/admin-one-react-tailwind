import { mdiEye, mdiTrashCan } from '@mdi/js'
import React, { useEffect, useState } from 'react'
import { useSampleClients } from '../../hooks/sampleData'
import { Client } from '../../interfaces'
import Button from '../Button'
import Buttons from '../Buttons'
import CardBoxModal from '../CardBox/Modal'
import UserAvatar from '../UserAvatar'
import useAxios from '../../hooks/useAxios'
import Input from '../Input/Input'

const TableSampleClients = ({ data:userData, setIsuserUpdate }: any) => {
  const perPage = 8

  const [currentPage, setCurrentPage] = useState(0)
  const [selectedItem, setSelectedItem] = useState(null)
  const [SearchValue, setSearchValue] = useState('')
  const [data, setData] = useState([]);
  const [originalData, setOriginalData] = useState([]);

  const clientsPaginated = data?.slice(perPage * currentPage, perPage * (currentPage + 1))

  const numPages = data?.length / perPage

  const pagesList = []

  for (let i = 0; i < numPages; i++) {
    pagesList.push(i)
  }

  const { data: statusData, error, loading, sendRequest } = useAxios()


  const [isModalInfoActive, setIsModalInfoActive] = useState(false)
  const [isModalTrashActive, setIsModalTrashActive] = useState(false)

  useEffect(() => {
    setIsuserUpdate(true)
  }, [statusData])

  const handleModalAction = () => {
    let method
    sendRequest(
      'user/status',
      {
        id: selectedItem?.id,
        status: selectedItem?.status === 'ban' ? 'unban' : 'ban',
      },
      (method = 'PATCH')
    )
    setIsModalInfoActive(false)
    setIsModalTrashActive(false)
  }

  const handleCancelModalAction = () => {
    setIsModalInfoActive(false)
    setIsModalTrashActive(false)
  }

  const handleClick = (item) => {
    setSelectedItem(item)
  }

  useEffect(() => {
    if (SearchValue) {
      const filteredData = originalData.filter((item) =>
        item?.firstName?.toLowerCase().includes(SearchValue.toLowerCase())
      );
      setData(filteredData);
    } else {
      setData(originalData);
    }
  }, [SearchValue, originalData]);

  useEffect(() => {
    if(userData){
     setData(userData)
     setOriginalData(userData);
    }
   }, [userData])

  console.log('Item', SearchValue)

  return (
    <>
      <Input
        icon={true}
        value={SearchValue}
        onChange={(e) => setSearchValue(e.target.value)}
        placeholder="Search Users"
      />

      <CardBoxModal
        title="Health  Information"
        buttonColor="info"
        buttonLabel="Done"
        isActive={isModalInfoActive}
        onConfirm={handleModalAction}
        onCancel={handleCancelModalAction}
      >
        <div className="flex justify-between">
          <div>height</div>
          <div>{selectedItem?.height}</div>
        </div>
        <div className="border"></div>
        <div className="flex justify-between">
          <div>weight</div>
          <div>{selectedItem?.weight}</div>
        </div>
        <div className="border"></div>
        <div className="flex justify-between">
          <div>Age</div>
          <div>{selectedItem?.age}</div>
        </div>
        <div className="border"></div>
        <div className="flex justify-between">
          <div>Gender</div>
          <div>{selectedItem?.gender}</div>
        </div>
        <div className="border"></div>
      </CardBoxModal>

      <CardBoxModal
        title="Please confirm"
        buttonColor={selectedItem?.status === 'unban' ? 'danger' : 'success'}
        buttonLabel={selectedItem?.status === 'unban' ? 'Ban' : 'Unban'}
        isActive={isModalTrashActive}
        onConfirm={handleModalAction}
        onCancel={handleModalAction}
      >
        <p>Are you sure ?</p>
      </CardBoxModal>

      <table>
        <thead>
          <tr>
            <th />
            <th>Name</th>
            <th>Email</th>
            <th>Username</th>
            <th>Progress</th>
            <th />
          </tr>
        </thead>
        <tbody>
          {clientsPaginated?.map((item: any, index) => (
            <tr
              key={index}
              onClick={() => {
                handleClick(item)
              }}
            >
              <td className="border-b-0 lg:w-6 before:hidden">
                {/* <UserAvatar username={client.name} className="w-24 h-24 mx-auto lg:w-6 lg:h-6" /> */}
              </td>
              <td data-label="Name">{item?.firstName + ' ' + item.lastName}</td>
              <td data-label="Company">{item?.email}</td>
              <td data-label="City">{item.username}</td>
              <td data-label="Progress" className="lg:w-32">
                <progress className="flex self-center w-2/5 lg:w-full" max="100" value={80}>
                  {90}
                </progress>
              </td>
              <td data-label="Created" className="lg:w-1 whitespace-nowrap">
                <small className="text-gray-500 dark:text-slate-400">{item?.created}</small>
              </td>
              <td className="before:hidden lg:w-1 whitespace-nowrap">
                <Buttons type="justify-start lg:justify-end" noWrap>
                  <Button
                    color="info"
                    icon={mdiEye}
                    onClick={() => setIsModalInfoActive(true)}
                    small
                  />
                  <Button
                    color={item?.status === 'ban' ? 'danger' : 'success'}
                    // icon={mdiTrashCan}
                    label="Ban"
                    onClick={() => setIsModalTrashActive(true)}
                    small
                  />
                </Buttons>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="p-3 border-t border-gray-100 lg:px-6 dark:border-slate-800">
        <div className="flex flex-col items-center justify-between py-3 md:flex-row md:py-0">
          <Buttons>
            {pagesList.map((page) => (
              <Button
                key={page}
                active={page === currentPage}
                label={page + 1}
                color={page === currentPage ? 'lightDark' : 'whiteDark'}
                small
                onClick={() => setCurrentPage(page)}
              />
            ))}
          </Buttons>
          <small className="mt-6 md:mt-0">
            Page {currentPage + 1} of {numPages}
          </small>
        </div>
      </div>
    </>
  )
}

export default TableSampleClients
