go build server/

cd balancer 
cargo build --release
cd target/release
cp balancer ../../exec

