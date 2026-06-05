export default function SummaryCard({ icon, label }) {

    return (

        <div className="summary-card">

            <img
                className="custom-icons"
                src={icon}
                alt="custom icons"
            />

            <p>{label}</p>

        </div>

    );

}