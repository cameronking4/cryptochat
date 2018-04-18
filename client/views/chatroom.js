
Template.chatroom.helpers({
    tolayout:function () {
        Router.go('/');
    },
    showCreateDialog:function () {
        return Session.get('showCreateDialog');
    },
    showListDialog:function () {
        return Session.get('showListDialog');
    },
    formatDate: function(timestamp) {
        var date = new Date(timestamp);
        return date.toLocaleString();
    },
    canDelete:function (username) {
        if(username == Meteor.user().username)
            return true;
        else
            return false;
    },
	showEmojis : function() {
            return listOfFakeMessages[ Math.floor(Math.random() * (4 - 0)) + 0];

        },
        messageIsUnlocked : function() {
            return Session.get("messageShow");
        },
        messages : function() {
            return Chat.find();
        }
    });

Template.chatroom.events({
    'click #logout':function (e) {
        e.preventDefault();
        Meteor.logout();
        Router.go('/');
    },
    'click #createChatRoom':function (e) {
        e.preventDefault();
        Session.set('showCreateDialog', true);
    },
    'click #listChatRoom':function (e) {
        e.preventDefault();
        Session.set('showListDialog', true);
    },
    'click .add-chat':function (e, tmpl) {
        e.preventDefault();
        var text = tmpl.find('#text-msg').value;
        var _id = Router.current().params._id;
        addChatInChatroom(text, _id);
        var objDiv = document.getElementById("always-scoll");
        objDiv.scrollTop = objDiv.scrollHeight;
        tmpl.find('#text-msg').value = '';
    },
    'click .delete':function (e, tmpl) {
        e.preventDefault();
        deleteChat(this._id);
    }
});

var addChatInChatroom = function (text, chatroom_id) {
    var id = Messages.insert({
        username: Meteor.user().username,
        text: text,
        timestamp: Date.now(),
        chatRoomId: chatroom_id
    });
    if(id==0){
        alert("insert error");
    }
};

var deleteChat = function (_id) {
    Messages.remove(_id);
};

var listOfFakeMessages = [" I am cool", " I'm doing homework", " I am so responsible", " I am studying"];

Template.chatroom.onRendered(function () {
    var objDiv = document.getElementById("always-scoll");
    objDiv.scrollTop = objDiv.scrollHeight;
});

Template.chatroom.rendered =(function () {
    Session.set("messageShow", false);

    var password = prompt("Please enter your password", "Enter password here");

    if (password == "king" ){
        Session.set("messageShow", true);
    } else {
        Session.get("messageShow", false);
    }
});


