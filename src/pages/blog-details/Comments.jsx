const Comments = ({ comments }) => {
  console.log(comments);
  const { name, profile, comment } = comments;
  return (
    <div>
      <div>
        <div>
          <img src={profile} alt="" className="w-10"/>
          <p>{comments.name}</p>
        </div>
      </div>
    </div>
  );
};

export default Comments;
