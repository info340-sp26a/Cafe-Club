export default function SummaryCard({ icon, label }) {

    return (

        <div className="summary-card">

            <img
                className="custom-icons"
                src={icon}
                alt=""
            />

            <p>{label}</p>

        </div>

    );

}