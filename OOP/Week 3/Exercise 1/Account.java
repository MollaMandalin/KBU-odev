
public class Account 
{
	
	private double balance;

	private String ownerName;



    Account(String name, double balance){
        this.ownerName = name;
        this.balance = balance;
    }
    
	void add(double amount){
        this.balance += amount;
	}

	void withdraw(double amount){
	    this.balance -= amount;
	
	}
	double getBalance(){
	    
	    return this.balance;
	
	}
	void setOwnerName(String name){
	    
	    this.ownerName = name;
	
	}
	String getOwnerName(double amount){
	    
	    return this.ownerName;
	}
}