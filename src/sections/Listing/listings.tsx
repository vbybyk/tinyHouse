interface Props {
    title: string;
  }

export const Listings = ({title} : Props) => {
  
  return (
    <div className="Listings">
        <h1>{title}</h1>
    </div>
  );
}
