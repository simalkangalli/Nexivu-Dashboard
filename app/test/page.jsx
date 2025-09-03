

const Page = () => {

    const handleForm = async (formData) => {
        "use server";
        const name = formData.get("name");
        console.log("Hello", name);
    };





    return (
        <div>
            <form action={handleForm}>

                <input type="text" name="name" />

                <button type="submit">Submit</button>
            </form>
        </div>
    )
}

export default Page;