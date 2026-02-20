import "./Profile.css";
import ClothesSection from "../ClothesSection/ClothesSection";
import SideBar from "../SideBar/SideBar";

function Profile({
  clothingItems,
  handleCardClick,
  onCardLike,
  handleAddClick,
  onLogout,
  onUpdateProfile,
  onOpenUpdateModal,
}) {
  return (
    <section className="profile">
      <SideBar
        onLogout={onLogout}
        onUpdateProfile={onUpdateProfile}
        onOpenUpdateModal={onOpenUpdateModal}
      />
      <ClothesSection
        handleAddClick={handleAddClick}
        clothingItems={clothingItems}
        handleCardClick={handleCardClick}
        onCardLike={onCardLike}
      />
    </section>
  );
}
export default Profile;
