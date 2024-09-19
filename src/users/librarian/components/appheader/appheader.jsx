import React, { useState } from "react";
import { BellFilled, MailOutlined } from "@ant-design/icons";
import { Badge, Drawer, Image, List, Space, Typography } from "antd";

function AppHeader() {
  const [commentsOpen, setCommentsOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);

  // Sample data for comments
  const commentsData = [
    { id: 1, body: "Comment 1" },
    { id: 2, body: "Comment 2" },
    { id: 3, body: "Comment 3" },
  ];

  // Sample data for notifications
  const notificationsData = [
    { id: 1, title: "Notification 1" },
    { id: 2, title: "Notification 2" },
    { id: 3, title: "Notification 3" },
  ];

  return (
    <div className="AppHeader">
      <Image
        width={100}
        src="https://pulsezest.com/wp-content/uploads/2023/09/pulsezesst.png"
      ></Image>
      <Typography.Title>Librarian Dashboard</Typography.Title>
      <Space>
        <Badge count={5} dot>
          <MailOutlined
            style={{ fontSize: 24 }}
            onClick={() => {
              setCommentsOpen(true);
            }}
          />
        </Badge>
        <Badge count={3}>
          <BellFilled
            style={{ fontSize: 24 }}
            onClick={() => {
              setNotificationsOpen(true);
            }}
          />
        </Badge>
      </Space>
      <Drawer
        title="Comments"
        placement="right"
        width={400}
        closable={true}
        onClose={() => setCommentsOpen(false)}
        visible={commentsOpen}
      >
        <List
          dataSource={commentsData}
          renderItem={(item) => (
            <List.Item>{item.body}</List.Item>
          )}
        />
      </Drawer>
      <Drawer
        title="Notifications"
        placement="right"
        width={400}
        closable={true}
        onClose={() => setNotificationsOpen(false)}
        visible={notificationsOpen}
      >
        <List
          dataSource={notificationsData}
          renderItem={(item) => (
            <List.Item>
              <Typography.Text strong>{item.title}</Typography.Text> has been ordered!
            </List.Item>
          )}
        />
      </Drawer>
    </div>
  );
}

export default AppHeader;
