export default function teamExist(teams,email){
    if(teams.length === 0){
        return false;
    }
    let i=0;
    let test = false
    do{
        if(teams[i].TeamLeader.email == email){
            test=true;
        }
        i++;
    }while(i<teams.lenght && test==false);
    return test;
}